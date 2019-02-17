import { handleActions } from 'redux-actions'
import { fetchDepartmentsSuccess, fetchDepartmentsError } from '$act/department'

export default handleActions(
  {
    [fetchDepartmentsSuccess]: (state, { payload }) => ({
      ...state,
      data: payload.data,
      error: null
    }),
    [fetchDepartmentsError]: (state, { payload }) => ({
      ...state,
      data: [],
      error: payload
    })
  },
  {
    data: [],
    error: null
  }
)