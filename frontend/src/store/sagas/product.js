import axios from 'axios'

import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts } from '$act/product'

function fetchApi ({ payload: { department, category, attributes, page }}) {
  const params = { count: 15, page }
  if (department) {
    params.departments = department
  }
  if (category) {
    params.categories = category
  }
  if (attributes) {
    params.attributes = JSON.stringify(attributes)
  }
  return axios.get(API_BASE + '/search/products', { params })
}

export default fetchActionSaga(fetchProducts, fetchApi)