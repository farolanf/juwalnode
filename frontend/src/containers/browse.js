import { connect } from 'react-redux';
import Browse from '$comp/browse'
import { fetchDepartments } from '$act/department'
import { fetchCategories } from '$act/category'

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(null, mapDispatchToProps)(Browse)