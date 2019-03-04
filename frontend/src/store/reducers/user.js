import { handleActions } from 'redux-actions'
import { setUser, updateCustomer } from '$act/user'

export default handleActions(
  {
    [setUser]: (state, { payload: { user }}) => ({
      ...state,
      user,
      loggedIn: !!user
    }),
    [updateCustomer.success]: (state, { payload: { data } }) => ({
      ...state,
      user: {
        ...state.user,
        Customer: data
      }
    })
  },
  {
    user: null,
    loggedIn: false
  }
)