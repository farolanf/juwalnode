import axios from 'axios'
import changeCase from 'change-case'

import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts } from '$act/product'

function fetchApi ({ payload: { q, departments, categories, attributes, offset, count }}) {
  const params = { offset, count }
  if (q) {
    params.q = q
  }
  if (departments && departments.length) {
    params.departments = departments.map(changeCase.upperCaseFirst)
  }
  if (categories && categories.length) {
    params.categories = categories.map(changeCase.upperCaseFirst)
  }
  if (attributes && attributes.length) {
    params.attributes = JSON.stringify(attributes)
  }
  return axios.get(API_BASE + '/search/products', { params })
}

export default fetchActionSaga(fetchProducts, fetchApi)