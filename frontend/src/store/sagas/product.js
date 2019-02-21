import axios from 'axios'
import _ from 'lodash'
import changeCase from 'change-case'

import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts } from '$act/product'

function fetchApi ({ payload: { department, category, attributes, page }}) {
  const params = { count: 15, page }
  if (department) {
    params.departments = _.castArray(department).map(changeCase.sentenceCase)
  }
  if (category) {
    params.categories = _.castArray(category).map(changeCase.sentenceCase)
  }
  if (attributes) {
    params.attributes = JSON.stringify(attributes)
  }
  return axios.get(API_BASE + '/search/products', { params })
}

export default fetchActionSaga(fetchProducts, fetchApi)