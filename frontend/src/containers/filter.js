import { connect } from 'react-redux';
import Filter from '$comp/filter'
import {
  toggleDepartment,
} from '$act/search'

const mapStateToProps = state => ({
  products: state.product.data,
  filters: state.search.get('filters')
})

const mapDispatchToProps = dispatch => ({
  toggleDepartment: department => dispatch(toggleDepartment({ department }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)