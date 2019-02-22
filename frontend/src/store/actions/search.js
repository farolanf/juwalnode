import { createAction } from 'redux-actions'

export const setFilters = createAction('SET_FILTERS')
export const clearFilters = createAction('CLEAR_FILTERS')

export const setQuery = createAction('SET_QUERY')

export const setDepartment = createAction('SET_DEPARTMENT')
export const toggleDepartment = createAction('TOGGLE_DEPARTMENT')

export const setCategory = createAction('SET_CATEGORY')
export const toggleCategory = createAction('TOGGLE_CATEGORY')

export const toggleAttribute = createAction('TOGGLE_ATTRIBUTE')
