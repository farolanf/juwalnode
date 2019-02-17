import { createAction } from 'redux-actions'

export const fetchDepartments = createAction('FETCH_DEPARTMENTS')
export const fetchDepartmentsSuccess = createAction('FETCH_DEPARTMENTS_SUCCESS')
export const fetchDepartmentsError = createAction('FETCH_DEPARTMENTS_ERROR')