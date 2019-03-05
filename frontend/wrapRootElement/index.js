import { compose } from 'lodash/fp'
import redux from './redux'
import script from './script'
import mui from './mui'
import notistack from './notistack'

export default element => {
  // don't wrap react-admin
  if (element.props.location.pathname.startsWith((process.env.GATSBY_PATH_PREFIX || '') + '/admin/')) {
    return element
  }
  return compose(
    redux,
    script,
    mui,
    notistack,
  )(element)
}