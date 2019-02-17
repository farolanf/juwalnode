import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/store'

const wrapRootElement = element => (
  <Provider store={store}>
    {element}
  </Provider>
)

export default wrapRootElement