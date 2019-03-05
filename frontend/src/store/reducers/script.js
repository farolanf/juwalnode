import { handleActions } from 'redux-actions'
import { addScript } from '$act/script'

export default handleActions(
  {
    [addScript]: (state, { payload }) => ({
      ...state,
      ...payload,
    })
  },
  {}
)