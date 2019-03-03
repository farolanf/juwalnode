import { connect } from 'react-redux'
import ProductDetail from '$comp/product-detail'
import { fetchProduct } from '$act/product'
import { addCartItem } from '$act/cart'

export default connect(
  state => ({
    product: state.product.product.data
  }),
  dispatch => ({
    fetchProduct: product_id => dispatch(fetchProduct({ product_id })),
    addCartItem: payload => dispatch(addCartItem(payload)),
  })
)(ProductDetail)