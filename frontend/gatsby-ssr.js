/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import _wrapRootElement from './wrapRootElement'

export const wrapPageElement = ({ element }) => _wrapRootElement(element)