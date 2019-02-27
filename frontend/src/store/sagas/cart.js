import axios from 'axios'
import { all } from 'redux-saga/effects'
import { fetchActionSaga } from '$src/lib/action'
import { fetchCart } from '$act/cart'
import { API_BASE } from '$src/const'

function fetchCartApi () {
  return axios.get(API_BASE + '/shoppingcarts')
}

function* saga () {
  yield all([
    fetchActionSaga(fetchCart, fetchCartApi)()
  ])
}

export default saga