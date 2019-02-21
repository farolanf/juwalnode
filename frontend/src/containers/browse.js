import { connect } from 'react-redux';
import Browse from '$comp/browse'
import { fetchDepartments } from '$act/department'
import { fetchCategories } from '$act/category'
import { fetchProducts } from '$act/product'
import {
  setFilters,
  clearFilters,
  setDepartment,
  setCategory,
} from '$act/search'

const mapStateToProps = state => ({
  departments: state.department.data,
  categories: state.category.data,
  products: state.product.data,
  filters: state.search.get('filters')
})

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchProducts: payload => dispatch(fetchProducts(payload)),
  setFilters: filters => dispatch(setFilters({ filters })),
  clearFilters: () => dispatch(clearFilters()),
  setDepartment: department => dispatch(setDepartment({ department })),
  setCategory: category => dispatch(setCategory({ category })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Browse)