import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '$src/theme'

const wrapRootElement = element => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </MuiThemeProvider>
)

export default wrapRootElement