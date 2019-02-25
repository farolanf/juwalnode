import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import _ from 'lodash'
import {
  setFilters,
  clearFilters,
  setQuery,
  setDepartment,
  setCategory,
  toggleCategory,
  toggleDepartment,
  toggleAttribute,
  setOffset,
} from '$act/search'

const initialState = {
  filters: {
    q: '',
    departments: [],
    categories: [],
    attributes: []
  },
  offset: 0,
  count: 15,
}

export default handleActions(
  {
    [setFilters]: (state, { payload: { filters }}) => ({
      ...state,
      filters: fromJS(filters),
    }),
    [clearFilters]: (state, { payload: { exclude } = {} }) =>
      state.updateIn(['filters'], filters => {
        _.each(initialState.filters, (val, key) => {
          if (exclude && exclude.includes(key)) return
          filters = filters.updateIn([key], () => fromJS(initialState.filters[key]))
        })
        return filters
      }),
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
    [toggleAttribute]: (state, { payload: { name, value }}) =>
      state.updateIn(
        ['filters', 'attributes'],
        list => listToggleAttribute(list, name, value)
      ),
    [setOffset]: (state, { payload: { offset }}) =>
        state.update('offset', () => offset),
  },
  fromJS(initialState)
)

// toggle value in a list with case insensitive comparison
function listToggleValuei (list, value) {
  const i = list.findIndex(v => v.toLowerCase() === value.toLowerCase())
  return i !== -1 ? list.delete(i) : list.push(value)
}

function listToggleAttribute (list, name, value) {
  const i = list.findIndex(a => a.name === name && a.value === value)
  return i !== -1 ? list.delete(i) : list.push({ name, value })
}