import { createAction } from 'redux-actions'
import { createAsyncAction } from '$lib/action'

export const setUser = createAction('SET_USER')

export const updateCustomer = createAsyncAction(
  'UPDATE_CUSTOMER',
  ({ values }) => values,
  ({ actions }) => actions
)