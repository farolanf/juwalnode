/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import 'typeface-roboto'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'

const config = require('./gatsby-config')

verify()

export const wrapPageElement = ({ element }) => {
  // no ssr for /admin
  if (element.props.location.pathname.startsWith((config.pathPrefix || '') + '/admin/')) {
    return null
  }
  return _wrapRootElement(element)
}