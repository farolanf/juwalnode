import { compose } from 'lodash/fp'
import redux from './redux'

export default element => {
  // don't wrap react-admin
  if (element.props.location.pathname.startsWith((process.env.GATSBY_PATH_PREFIX || '') + '/admin/')) {
    return element
  }
  return compose(
    redux,
  )(element)
}