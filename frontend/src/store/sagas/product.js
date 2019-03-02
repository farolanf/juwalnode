import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import changeCase from 'change-case'

import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts, fetchProduct } from '$act/product'
import { setOffset } from '$act/search'

import store from '$src/store'

function fetchProductsApi ({ payload: { q, departments, categories, attributes, offset, count }}) {
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

function fetchProductApi ({ payload: { product_id } }) {
  return axios.get(API_BASE + '/products/' + product_id)
}

function* doUpdateOffset ({ payload: { data }}) {
  if (store.getState().search.get('offset') >= data.hits.total) {
    yield put(setOffset({ offset: 0 }))
  }
}

function* updateOffset () {
  yield takeLatest(fetchProducts.success, doUpdateOffset)
}

function* saga () {
  yield all([
    fetchActionSaga(fetchProducts, fetchProductsApi)(),
    fetchActionSaga(fetchProduct, fetchProductApi)(),
    updateOffset()
  ])
}

export default saga