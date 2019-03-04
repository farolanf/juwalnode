import { combineReducers } from 'redux'
import { fetchActionReducer } from '$lib/action'
import { fetchShippingRegions, fetchShippings } from '$act/shipping'

export default combineReducers({
  shippingRegions: fetchActionReducer(fetchShippingRegions),
  shippings: fetchActionReducer(fetchShippings),
})