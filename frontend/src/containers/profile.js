import { connect } from 'react-redux'
import Profile from '$comp/profile'
import { updateCustomer } from '$act/user'
import { fetchShippingRegions, fetchShippings } from '$act/shipping'

export default connect(
  state => ({
    customer: state.user.user && state.user.user.Customer,
    shippingRegions: state.shipping.shippingRegions.data,
    shippings: state.shipping.shippings.data,
  }),
  dispatch => ({
    updateCustomer: payload => dispatch(updateCustomer(payload)),
    fetchShippingRegions: () => dispatch(fetchShippingRegions()),
    fetchShippings: () => dispatch(fetchShippings()),
  })
)(Profile)