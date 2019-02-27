import { all } from 'redux-saga/effects'
import department from './department'
import category from './category'
import product from './product'
import cart from './cart'

function* rootSaga () {
  yield all([
    department(),
    category(),
    product(),
    cart(),
  ])
}

export default rootSaga