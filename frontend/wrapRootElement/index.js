import { compose } from 'lodash/fp'
import redux from './redux'
import mui from './mui'

export default element => {
  // don't wrap react-admin
  if (element.key.startsWith('/admin/')) {
    return element
  }
  return compose(
    redux,
    mui
  )(element)
}