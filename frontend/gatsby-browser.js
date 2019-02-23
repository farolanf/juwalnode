/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import 'typeface-roboto'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'

verify()

export const wrapPageElement = ({ element }) => _wrapRootElement(element)