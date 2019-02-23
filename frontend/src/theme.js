import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
  },
  typography: {
    useNextVariants: true
  }
})

process.env.NODE_ENV !== 'production' && console.log(theme)

export default theme