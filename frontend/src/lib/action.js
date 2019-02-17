import { createAction, handleActions } from 'redux-actions'
import { takeLatest, call, put } from 'redux-saga/effects'

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
      error: null
    }),
    [action.error]: (state, { payload }) => ({
      ...state,
      data: null,
      error: payload
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

export function handleFetchAsync (action, fetchApi) {
  return function* () {
    try {
      const response = yield call(fetchApi)
      yield put(action.success({ data: response.data }))
    } catch (err) {
      yield put(action.error(err))
    }
  }
}

export function fetchActionSaga (action, fetchApi) {
  return function* () {
    yield takeLatest(action, handleFetchAsync(action, fetchApi))
  }
}