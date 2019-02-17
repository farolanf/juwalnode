import { combineReducers } from 'redux'
import auth from './auth'
import department from './department'

export default combineReducers({
  auth,
  department,
})