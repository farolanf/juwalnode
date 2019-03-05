import { combineReducers } from 'redux'
import user from './user'
import department from './department'
import category from './category'
import product from './product'
import search from './search'
import cart from './cart'
import notification from './notification'
import shipping from './shipping'
import script from './script'

export default combineReducers({
  user,
  department,
  category,
  product,
  search,
  cart,
  notification,
  shipping,
  script,
})