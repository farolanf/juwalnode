import { connect } from 'react-redux'
import CheckoutComplete from '$comp/checkout-complete'
import { fetchCart } from '$act/cart'

export default connect(
  null,
  dispatch => ({
    fetchCart: () => dispatch(fetchCart())
  })
)(CheckoutComplete)