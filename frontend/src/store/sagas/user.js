import { all, takeLatest, call } from 'redux-saga/effects'
import axios from 'axios'

import { asyncActionSaga } from '$lib/action'
import { updateCustomer } from '$act/user'

import { API_BASE } from '$src/const'
import { putNotification } from '$lib/saga'

function updateApi ({ payload: customer, meta: { setSubmitting } }) {
  return axios
    .put(API_BASE + '/customers/' + customer.customer_id, customer)
    .finally(() => setSubmitting(false))
}

function* handleUpdateSuccess ({ payload: { meta: { resetForm } } }) {
  yield putNotification({ message: 'Profile updated' })
  yield call(resetForm)
}

function* saga () {
  yield all([
    asyncActionSaga(updateCustomer, updateApi)(),
    takeLatest(updateCustomer.success, handleUpdateSuccess)
  ])
}

export default saga