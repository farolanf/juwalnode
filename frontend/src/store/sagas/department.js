import { takeLatest, call, put } from 'redux-saga/effects'
import {
  fetchDepartments,
  fetchDepartmentsSuccess,
  fetchDepartmentsError
} from '$act/department'
import axios from 'axios'
import { API_BASE } from '$src/const'

function* doFetchDepartments () {
  try {
    const response = yield call([axios, 'get'], API_BASE + '/Departments')
    yield put(fetchDepartmentsSuccess({ data: response.data }))
  } catch (err) {
    yield put(fetchDepartmentsError(err))
  }
}

function* saga () {
  yield takeLatest(fetchDepartments, doFetchDepartments)
}

export default saga