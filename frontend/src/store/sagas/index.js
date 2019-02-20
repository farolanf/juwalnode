import { all } from 'redux-saga/effects'
import department from './department'
import category from './category'
import product from './product'

function* rootSaga () {
  yield all([
    department(),
    category(),
    product()
  ])
}

export default rootSaga