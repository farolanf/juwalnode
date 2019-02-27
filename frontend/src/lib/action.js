import { createAction, handleActions } from 'redux-actions'
import { takeLatest, call, put } from 'redux-saga/effects'
import { contentRange } from '$src/lib/pagination'

// Async action

export function createAsyncAction (name) {
  const action = createAction(name)
  action.success = createAction(name + '_SUCCESS')
  action.error = createAction(name + '_ERROR')
  return action
}

export function handleAsyncAction (action, asyncApi, onSuccess) {
  return function* (dispatchedAction) {
    try {
      const response = yield call(asyncApi, dispatchedAction)
      onSuccess
        ? yield onSuccess({ action, response, put })
        : yield put(action.success({ data: response.data }))
    } catch (err) {
      yield put(action.error(err))
    }
  }
}

export function asyncActionSaga (action, asyncApi, onSuccess) {
  return function* () {
    yield takeLatest(action, handleAsyncAction(action, asyncApi, onSuccess))
  }
}

// Fetch action

export function createFetchAction (name) {
  return createAsyncAction(name)
}

export function fetchActionReducersObj (action) {
  return   {
    [action.success]: (state, { payload }) => ({
      ...state,
      data: payload.data,
      range: payload.range,
      error: null
    }),
    [action.error]: (state, { payload }) => ({
      ...state,
      data: null,
      range: null,
      error: ''+payload
    })
  }
}

export function handleFetchAction (action, reducers = {}) {
  return handleActions(
    {
      ...fetchActionReducersObj(action),
      ...reducers
    },
    {
      data: null,
      error: null
    }
  )
}

export function fetchActionSaga (action, fetchApi, onSuccess) {
  return asyncActionSaga(
    action,
    fetchApi,
    function* ({ action, response, put }) {
      const range = contentRange(response.headers['content-range'])
      onSuccess
        ? yield onSuccess({ action, response, range, put })
        : yield put(action.success({ data: response.data, range }))
    }
  )
}