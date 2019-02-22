import { connect } from 'react-redux';
import Filter from '$comp/filter'
import {
  toggleDepartment,
  toggleCategory,
  toggleAttribute,
} from '$act/search'

const mapStateToProps = state => ({
  products: state.product.data,
  filters: state.search.get('filters')
})

const mapDispatchToProps = dispatch => ({
  toggleDepartment: department => dispatch(toggleDepartment({ department })),
  toggleCategory: category => dispatch(toggleCategory({ category })),
  toggleAttribute: (name, value) => dispatch(toggleAttribute({ name, value }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)