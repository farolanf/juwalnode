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

const dirtySelector = createSelector(
  itemsSelector,
  items => !!items.find(item => item._dirty)
)

export default connect(
  state => ({
    items: state.cart.data,
    subTotal: subTotalSelector(state),
    shipping: shippingSelector(state),
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