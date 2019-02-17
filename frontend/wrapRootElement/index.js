import { compose } from 'lodash/fp'
import redux from './redux'
import mui from './mui'

export default compose(
  redux,
  mui
)