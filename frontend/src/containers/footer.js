import { connect } from 'react-redux';
import Footer from '$comp/footer'
import { fetchDepartments } from '$act/department'

const mapStateToProps = state => ({
  departments: state.department.data,
})

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)