import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCartItem } from '$act/cart'
import Product from '$comp/product'

export default connect(
  null,
  dispatch => bindActionCreators({ addCartItem }, dispatch)
)(Product)