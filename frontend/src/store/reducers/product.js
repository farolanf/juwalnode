import { combineReducers } from 'redux'
import { handleFetchAction } from '$src/lib/action'
import { fetchProducts, fetchProduct } from '$act/product'

export default combineReducers({
  products: handleFetchAction(fetchProducts),
  product: handleFetchAction(fetchProduct),
})