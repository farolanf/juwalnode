import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import {
  setFilters,
  clearFilters,
  setQuery,
  setDepartment,
  toggleDepartment
} from '$act/search'
import { setCategory, toggleCategory } from '../actions/search';

const initialState = {
  filters: {
    q: '',
    departments: [],
    categories: [],
    attributes: []
  }
}

export default handleActions(
  {
    [setFilters]: (state, { payload: { filters }}) => fromJS(filters),
    [clearFilters]: () => fromJS(initialState),
    [setQuery]: (state, { payload: { q }}) =>
      state.updateIn(['filters', 'q'], () => q),
    [setDepartment]: (state, { payload: { department }}) =>
      state.updateIn(
        ['filters', 'departments'],
        list => list.clear().push(department)
      ),
    [toggleDepartment]: (state, { payload: { department }}) =>
      state.updateIn(
        ['filters', 'departments'],
        list => listToggleValuei(list, department)
      ),
    [setCategory]: (state, { payload: { category }}) =>
      state.updateIn(
        ['filters', 'categories'],
        list => list.clear().push(category)
      ),
    [toggleCategory]: (state, { payload: { category }}) =>
      state.updateIn(
        ['filters', 'categories'],
        list => listToggleValuei(list, category)
      ),
  },
  fromJS(initialState)
)

// toggle value in a list with case insensitive comparison
function listToggleValuei (list, value) {
  const i = list.findIndex(v => v.toLowerCase() === value.toLowerCase())
  return i !== -1 ? list.delete(i) : list.push(value)
}