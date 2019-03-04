import axios from 'axios'
import { asyncActionSaga } from '$lib/action'
import { updateCustomer } from '$act/user'
import { API_BASE } from '$src/const'

function updateApi ({ payload: customer, meta: { setSubmitting } }) {
  return axios
    .put(API_BASE + '/customers/' + customer.customer_id, customer)
    .finally(() => setSubmitting(false))
}

export default asyncActionSaga(updateCustomer, updateApi)