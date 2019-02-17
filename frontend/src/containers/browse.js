import { connect } from 'react-redux';
import Browse from '$comp/browse'
import { fetchDepartments } from '$act/department'

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments())
})

export default connect(null, mapDispatchToProps)(Browse)