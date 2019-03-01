import { handleActions } from 'redux-actions'
import { addNotification, deleteNotification } from '$act/notification'

let id = 1

export default handleActions(
  {
    [addNotification]: (state, { payload }) => ({
      ...state,
      data: [
        ...state.data,
        {
          id: id++,
          ...payload
        }
      ]
    }),
    [deleteNotification]: (state, { payload: { id } }) => ({
      ...state,
      data: state.data.filter(n => n.id !== id)
    })
  },
  {
    data: []
  }
)