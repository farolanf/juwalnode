import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '$src/theme'

const wrapRootElement = element => (
  <MuiThemeProvider theme={theme}>
    {element}
  </MuiThemeProvider>
)

export default wrapRootElement