/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import 'typeface-roboto'
import React from 'react'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'
import { sheetsRegistry } from './wrapRootElement/mui'

verify()

export const onPreRenderHTML = ({ getHeadComponents }) => {
  const css = sheetsRegistry.toString()
  const styles = <style key='ssr-styles' data-ssr-styles>{css}</style>
  const components = getHeadComponents()
  components.push(styles)
}

export const wrapPageElement = ({ element }) => {
  // no ssr for /admin
  if (element.props.location.pathname.startsWith((process.env.GATSBY_PATH_PREFIX || '') + '/admin/')) {
    return null
  }
  return _wrapRootElement(element)
}