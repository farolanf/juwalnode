import { connect } from 'react-redux';
import Header from '$comp/header'
import { fetchDepartments } from '$act/department'
import { fetchCategories } from '$act/category'
import { clearFilters, setQuery } from '$act/search'
import { fetchCart } from '$act/cart'

const mapStateToProps = state => ({
  departments: state.department.data,
  categories: state.category.data,
  user: state.auth.user,
  loggedIn: state.auth.loggedIn,
  items: state.cart.data,
})

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchCategories: () => dispatch(fetchCategories()),
  clearFilters: () => dispatch(clearFilters()),
  setQuery: q => dispatch(setQuery({ q })),
  fetchCart: () => dispatch(fetchCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)