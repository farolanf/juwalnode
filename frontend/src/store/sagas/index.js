import { all } from 'redux-saga/effects'
import department from './department'
import category from './category'

function* rootSaga () {
  yield all([
    department(),
    category()
  ])
}

export default rootSaga