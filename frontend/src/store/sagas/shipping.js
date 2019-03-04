import { all } from 'redux-saga/effects'
import axios from 'axios'

import { fetchActionSaga } from '$lib/action'
import { fetchShippingRegions, fetchShippings } from '$act/shipping'

import { API_BASE } from '$src/const'

function fetchShippingRegionsApi () {
  return axios.get(API_BASE + '/shippingregions')
}

function fetchShippingsApi () {
  return axios.get(API_BASE + '/shippings')
}

function* saga () {
  yield all([
    fetchActionSaga(fetchShippingRegions, fetchShippingRegionsApi)(),
    fetchActionSaga(fetchShippings, fetchShippingsApi)(),
  ])
}

export default saga