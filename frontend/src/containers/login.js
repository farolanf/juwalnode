import { connect } from 'react-redux'
import LoginBox from '$comp/login'
import { setUser } from '$act/auth'

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser({ user }))
})

export default connect(null, mapDispatchToProps)(LoginBox)