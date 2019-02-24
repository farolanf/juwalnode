import { compose } from 'lodash/fp'
import redux from './redux'
import mui from './mui'

import config from '../gatsby-config'

export default element => {
  // don't wrap react-admin
  if (element.props.location.pathname.startsWith((config.pathPrefix || '') + '/admin/')) {
    return element
  }
  return compose(
    redux,
    mui
  )(element)
}