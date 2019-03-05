import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

import store from '$src/store'
import { addScript } from '$act/script'

import { PAYPAL_ID } from '$src/const'

const dispatch = params => {
  store.dispatch(addScript(params))
}

const checkScripts = () => {
  const state = store.getState()
  !state.script.paypal && typeof paypal !== 'undefined' && dispatch({ paypal })
}

const Script = ({ children }) => {
  useEffect(() => {
    const timerId = setInterval(checkScripts, 500)
    return () => clearInterval(timerId)
  }, [])
  return children
}

const wrapRootElement = element => (
  <Script>
    <Helmet>
      <script src={'https://www.paypal.com/sdk/js?client-id=' + PAYPAL_ID}></script>
    </Helmet>
    {element}
  </Script>
)

export default wrapRootElement