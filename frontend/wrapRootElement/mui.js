import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '$src/theme'

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
})

const wrapRootElement = element => (
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </MuiThemeProvider>
  </JssProvider>
)

export default wrapRootElement