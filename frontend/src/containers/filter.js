import { connect } from 'react-redux';
import Filter from '$comp/filter'
import {
  setFilters,
  toggleDepartment,
} from '$act/search'

const mapStateToProps = state => ({
  products: state.product.data,
  filters: state.search.filters
})

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFilters({ filters })),
  toggleDepartment: department => dispatch(toggleDepartment({ department }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)