import { createAction, handleActions } from 'redux-actions'
import { takeLatest, call, put } from 'redux-saga/effects'
import { contentRange } from '$src/lib/pagination'

export function createFetchAction (name) {
  const action = createAction(name)
  action.success = createAction(name + '_SUCCESS')
  action.error = createAction(name + '_ERROR')
  return action
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

export function handleFetchAction (action) {
  return handleActions(
    fetchActionReducersObj(action),
    {
      data: [],
      error: null
    }
  )
}

export function handleFetchAsync (action, fetchApi, onSuccess) {
  return function* (dispatchedAction) {
    try {
      const response = yield call(fetchApi, dispatchedAction)
      const range = contentRange(response.headers['content-range'])
      onSuccess
        ? onSuccess({ action, response, range, put })
        : yield put(action.success({ data: response.data, range }))
    } catch (err) {
      yield put(action.error(err))
    }
  }
}

export function fetchActionSaga (action, fetchApi, onSuccess) {
  return function* () {
    yield takeLatest(action, handleFetchAsync(action, fetchApi, onSuccess))
  }
}