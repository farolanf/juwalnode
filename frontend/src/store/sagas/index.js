import { all } from 'redux-saga/effects'
import department from './department'
import category from './category'
import product from './product'
import cart from './cart'
import user from './user'
import shipping from './shipping'

function* rootSaga () {
  yield all([
    department(),
    category(),
    product(),
    cart(),
    user(),
    shipping(),
  ])
}

export default rootSaga