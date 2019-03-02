import { connect } from 'react-redux'
import ProductDetail from '$comp/product-detail'
import { fetchProduct } from '$act/product'

export default connect(
  state => ({
    product: state.product.product.data
  }),
  dispatch => ({
    fetchProduct: product_id => dispatch(fetchProduct({ product_id }))
  })
)(ProductDetail)