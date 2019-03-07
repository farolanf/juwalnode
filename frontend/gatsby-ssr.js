/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import 'typeface-roboto'
import React from 'react'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'
import { getSheetsRegistry } from './wrapRootElement/mui'

verify()

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const sheetsRegistry = getSheetsRegistry()
  if (!sheetsRegistry) return
  const css = sheetsRegistry.toString()
  const styles = (
    <style 
      key='ssr-styles' 
      data-ssr-styles 
      dangerouslySetInnerHTML={{ __html: css }}>
    </style>
  )
  const components = getHeadComponents().slice()
  components.push(styles)
  replaceHeadComponents(components)
}

export const wrapPageElement = ({ element }) => {
  // no ssr for /admin
  if (element.props.location.pathname.startsWith((process.env.GATSBY_PATH_PREFIX || '') + '/admin/')) {
    return null
  }
  return _wrapRootElement(element)
}