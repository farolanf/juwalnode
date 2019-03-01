import { combineReducers } from 'redux'
import auth from './auth'
import department from './department'
import category from './category'
import product from './product'
import search from './search'
import cart from './cart'
import notification from './notification'

export default combineReducers({
  auth,
  department,
  category,
  product,
  search,
  cart,
  notification,
})