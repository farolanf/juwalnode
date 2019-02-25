/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import 'typeface-roboto'
import GAnalytics from 'ganalytics'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'

const ga = GAnalytics('UA-49818631-2')

verify()

export const wrapPageElement = ({ element }) => _wrapRootElement(element)

export const onRouteUpdate = ({ location }) => {
  ga.send('pageview', { dl: location.href, dt: document.title })
}