/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import 'typeface-roboto'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'
import { setUser } from '$act/auth'
import store from '$src/store'

verify().then(res => {
  store.dispatch(setUser({ user: res.data.user }))
})

export const wrapPageElement = ({ element }) => _wrapRootElement(element)