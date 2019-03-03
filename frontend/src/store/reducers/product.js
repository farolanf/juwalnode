import { combineReducers } from 'redux'
import { fetchActionReducer } from '$src/lib/action'
import { fetchProducts, fetchProduct } from '$act/product'

export default combineReducers({
  products: fetchActionReducer(fetchProducts),
  product: fetchActionReducer(fetchProduct),
})