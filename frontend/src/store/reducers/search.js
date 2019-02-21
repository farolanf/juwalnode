import { handleActions } from 'redux-actions'
import { setFilters } from '$act/search'

export default handleActions(
  {
    [setFilters]: (state, { payload: { filters } }) => ({
      ...state,
      filters
    })
  },
  {
    filters: {
      q: '',
      departments: [],
      categories: [],
      attributes: []
    }
  }
)