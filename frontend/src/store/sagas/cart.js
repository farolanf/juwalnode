import axios from 'axios'
import _ from 'lodash'
import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { fetchActionSaga, fetchActionWorker, asyncActionWorker } from '$src/lib/action'
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} from '$act/cart'
import { API_BASE } from '$src/const'
import { createPutNotification } from '$lib/saga'

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
  yield all([
    takeEvery(addCartItem.success, createPutNotification(
      ({ payload: { data } }) => ({
        message: `'${data.Product.name}' added to cart`
      })
    )),
    takeEvery(deleteCartItem.success, createPutNotification(
      ({ payload: { data } }) => ({
        message: `'${data.Product.name}' deleted`
      })
    )),
    takeEvery(updateCartItem.success, createPutNotification(
      ({ payload: { data } }) => ({
        message: `'${data.Product.name}' updated`
      })
    ))
  ])
}

function* saga () {
  yield all([
    fetchActionSaga(fetchCart, fetchCartApi)(),
    takeLatest(addCartItem.success, fetchActionWorker(fetchCart, fetchCartApi)),
    takeEvery(addCartItem, asyncActionWorker(addCartItem, addItemApi)),
    takeEvery(updateCartItem, asyncActionWorker(updateCartItem, updateItemApi)),
    takeEvery(deleteCartItem, asyncActionWorker(deleteCartItem, deleteItemApi)),
    notifications(),
  ])
}

export default saga