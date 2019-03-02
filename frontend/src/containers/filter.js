import { connect } from 'react-redux';
import Filter from '$comp/filter'
import {
  clearFilters,
  toggleDepartment,
  toggleCategory,
  toggleAttribute,
} from '$act/search'

const mapStateToProps = state => ({
  products: state.product.products.data,
  filters: state.search.get('filters')
})

const mapDispatchToProps = dispatch => ({
  clearFilters: payload => dispatch(clearFilters(payload)),
  toggleDepartment: department => dispatch(toggleDepartment({ department })),
  toggleCategory: category => dispatch(toggleCategory({ category })),
  toggleAttribute: (name, value) => dispatch(toggleAttribute({ name, value }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)