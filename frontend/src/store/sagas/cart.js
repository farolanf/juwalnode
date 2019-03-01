import axios from 'axios'
import _ from 'lodash'
import { takeLatest, all, put } from 'redux-saga/effects'
import { fetchActionSaga, asyncActionSaga } from '$src/lib/action'
import { addNotification } from '$act/notification'
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} from '$act/cart'
import { API_BASE } from '$src/const'

function fetchCartApi () {
  return axios.get(API_BASE + '/shoppingcarts')
}

function addItemApi ({ payload }) {
  return axios.post(API_BASE + '/shoppingcarts', payload)
}

function updateItemApi ({ payload: { item } }) {
  return axios.put(
    API_BASE + '/shoppingcarts/' + item.item_id,
    _.pick(item, ['product_id', 'attrs', 'quantity'])
  )
}

function deleteItemApi ({ payload: { item } }) {
  return axios.delete(API_BASE + '/shoppingcarts/' + item.item_id)
    .then(() => ({ data: item }))
}

function* notifications () {
  yield takeLatest(addCartItem.success, createPutNotification(
    ({ payload: { data } }) => ({
      message: `'${data.Product.name}' added to cart`
    })
  ))
  yield takeLatest(deleteCartItem.success, createPutNotification(
    ({ payload: { data } }) => ({
      message: `'${data.Product.name}' deleted`
    })
  ))
}

const createPutNotification = getParamsCb => 
  function* (action) {
    yield put(addNotification(getParamsCb(action)))
  }

function* saga () {
  yield all([
    fetchActionSaga(fetchCart, fetchCartApi)(),
    asyncActionSaga(addCartItem, addItemApi)(),
    asyncActionSaga(updateCartItem, updateItemApi)(),
    asyncActionSaga(deleteCartItem, deleteItemApi)(),
    notifications(),
  ])
}

export default saga