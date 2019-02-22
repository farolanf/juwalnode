import { handleActions } from 'redux-actions'
import { setUser } from '$act/auth'

export default handleActions(
  {
    [setUser]: (state, { payload: { user }}) => ({
      ...state,
      user,
      loggedIn: !!user
    })
  },
  {
    user: null,
    loggedIn: false
  }
)