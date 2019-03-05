import { connect } from 'react-redux'
import {
  fetchCart,
  setCartItemQuantity,
  updateCartItem,
  deleteCartItem,
} from '$act/cart'
import Cart from '$comp/cart'
import { 
  subTotalSelector,
  shippingCostSelector,
  totalSelector,
  dirtySelector,
} from '$selector/cart'

export default connect(
  state => ({
    items: state.cart.data,
    subTotal: subTotalSelector(state),
    shipping: shippingCostSelector(state),
    total: totalSelector(state),
    dirty: dirtySelector(state),
  }),
  dispatch => ({
    fetchCart: () => dispatch(fetchCart()),
    setCartItemQuantity: (id, quantity) => 
      dispatch(setCartItemQuantity({ id, quantity })),
    updateCartItem: item => dispatch(updateCartItem({ item })),
    deleteCartItem: item => dispatch(deleteCartItem({ item })),
  })
)(Cart)