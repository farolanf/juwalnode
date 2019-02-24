import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
  },
  typography: {
    useNextVariants: true
  }
})

process.env.NODE_ENV === 'development' && console.log(theme)

export default theme