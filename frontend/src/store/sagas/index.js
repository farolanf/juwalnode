import { all } from 'redux-saga/effects'
import department from './department'

function* rootSaga () {
  yield all([
    department(),
  ])
}

export default rootSaga