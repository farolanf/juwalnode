import axios from 'axios'
import _ from 'lodash'
import changeCase from 'change-case'

import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts } from '$act/product'

function fetchApi ({ payload: { departments, categories, attributes, page }}) {
  const params = { count: 15, page }
  if (departments) {
    params.departments = _.castArray(departments).map(changeCase.upperCaseFirst)
  }
  if (categories) {
    params.categories = _.castArray(categories).map(changeCase.upperCaseFirst)
  }
  if (attributes) {
    params.attributes = JSON.stringify(attributes)
  }
  return axios.get(API_BASE + '/search/products', { params })
}

export default fetchActionSaga(fetchProducts, fetchApi)