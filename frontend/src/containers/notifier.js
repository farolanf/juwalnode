import { connect } from 'react-redux'
import Notifier from '$comp/notifier'
import { deleteNotification } from '$act/notification'

export default connect(
  state => ({
    notifications: state.notification.data
  }),
  dispatch => ({
    deleteNotification: id => dispatch(deleteNotification({ id }))
  })
)(Notifier)