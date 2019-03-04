import { put } from 'redux-saga/effects'
import { addNotification } from '$act/notification'

export const putNotification = options => put(addNotification(options))

export const createPutNotification = getParamsCb => 
  function* (action) {
    yield put(addNotification(getParamsCb(action)))
  }

