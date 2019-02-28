import { connect } from 'react-redux'
import {
  fetchCart,
  setCartItemQuantity,
  updateCartItem,
  deleteCartItem,
} from '$act/cart'
import Cart from '$comp/cart'

export default connect(
  state => ({
    items: state.cart.data
  }),
  dispatch => ({
    fetchCart: () => dispatch(fetchCart()),
    setCartItemQuantity: (i, val) => dispatch(setCartItemQuantity({ i, val })),
    updateCartItem: item => dispatch(updateCartItem({ item })),
    deleteCartItem: item => dispatch(deleteCartItem({ item })),
  })
)(Cart)