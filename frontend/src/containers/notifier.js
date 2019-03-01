import { connect } from 'react-redux'
import Notifier from '$comp/notifier'
import { clearNotifications } from '$act/notification'

export default connect(
  state => ({
    notifications: state.notification.data
  }),
  dispatch => ({
    clearNotifications: () => dispatch(clearNotifications())
  })
)(Notifier)