import { all } from 'redux-saga/effects'
import department from './department'
import category from './category'
import product from './product'
import cart from './cart'
import shipping from './shipping'

function* rootSaga () {
  yield all([
    department(),
    category(),
    product(),
    cart(),
    shipping(),
  ])
}

export default rootSaga