import _ from 'lodash'
import { connect } from 'react-redux'
import Checkout from '$comp/checkout'
import { 
  subTotalSelector,
  shippingCostSelector,
  totalSelector,
} from '$selector/cart';
import { setShipping } from '$act/cart'

export default connect(
  state => ({
    shippingRegion: _.get(state, 'user.user.Customer.ShippingRegion'),
    shippings: _.get(state, 'user.user.Customer.ShippingRegion.Shippings'),
    shipping: state.cart.shipping, 
    subTotal: subTotalSelector(state),
    shippingCost: shippingCostSelector(state),
    total: totalSelector(state),
    paypal: state.script.paypal,
  }), 
  dispatch => ({
    setShipping: shipping => dispatch(setShipping({ shipping }))
  })
)(Checkout)