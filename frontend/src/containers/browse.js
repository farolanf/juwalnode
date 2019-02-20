import { connect } from 'react-redux';
import Browse from '$comp/browse'
import { fetchDepartments } from '$act/department'
import { fetchCategories } from '$act/category'
import { fetchProducts } from '$act/product'

const mapStateToProps = state => ({
  departments: state.department.data,
  categories: state.category.data,
  products: state.product.data
})

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchProducts: payload => dispatch(fetchProducts(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Browse)