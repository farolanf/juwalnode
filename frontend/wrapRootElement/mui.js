import React from 'react'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '$src/theme'

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  seed: '4kXL9d',
})

export const sheetsRegistry = new SheetsRegistry()
const sheetsManager = new Map()

const wrapRootElement = element => (
  <JssProvider generateClassName={generateClassName} registry={sheetsRegistry}>
    <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
      <CssBaseline />
      {element}
    </MuiThemeProvider>
  </JssProvider>
)

export default wrapRootElement