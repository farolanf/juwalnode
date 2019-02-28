import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  fetchCart,
  setCartItemQuantity,
  updateCartItem,
  deleteCartItem,
} from '$act/cart'
import Cart from '$comp/cart'

const itemsSelector = state => state.cart.data || []

// TODO: get cost based on shipping region
const shippingSelector = () => 15

const subTotalSelector = createSelector(
  itemsSelector,
  items => items.reduce((acc, item) => {
    return acc + (item.Product.price * item.quantity)
  }, 0)
)

const totalSelector = createSelector(
  subTotalSelector,
  shippingSelector,
  (subTotal, shipping) => subTotal + shipping
)

export default connect(
  state => ({
    items: state.cart.data,
    subTotal: subTotalSelector(state),
    shipping: shippingSelector(state),
    total: totalSelector(state),
  }),
  dispatch => ({
    fetchCart: () => dispatch(fetchCart()),
    setCartItemQuantity: (i, val) => dispatch(setCartItemQuantity({ i, val })),
    updateCartItem: item => dispatch(updateCartItem({ item })),
    deleteCartItem: item => dispatch(deleteCartItem({ item })),
  })
)(Cart)