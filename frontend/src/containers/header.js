import { connect } from 'react-redux';
import Header from '$comp/header'
import { fetchDepartments } from '$act/department'
import { fetchCategories } from '$act/category'

const mapStateToProps = state => ({
  departments: state.department.data,
  categories: state.category.data
})

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)