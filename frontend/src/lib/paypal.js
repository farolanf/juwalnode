import axios from 'axios'
import { API_BASE } from '$src/const'

export const createOrder = (params) => {
  return axios.post(API_BASE + '/paypal/orders', params)
}

export const captureOrder = (orderID) => {
  return axios.post(API_BASE + '/paypal/orders/' + orderID)
}