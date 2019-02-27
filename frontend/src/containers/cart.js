import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCart } from '$act/cart'
import Cart from '$comp/cart'

export default connect(
  state => ({
    items: state.cart.data
  }),
  dispatch => bindActionCreators({ fetchCart }, dispatch)
)(Cart)