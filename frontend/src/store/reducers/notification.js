import { handleActions } from 'redux-actions'
import { addNotification, clearNotifications } from '$act/notification'

export default handleActions(
  {
    [addNotification]: (state, { payload }) => ({
      ...state,
      data: [
        ...state.data,
        {
          ...payload
        }
      ]
    }),
    [clearNotifications]: state => ({
      ...state,
      data: []
    })
  },
  {
    data: []
  }
)