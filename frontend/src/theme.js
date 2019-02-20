import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
  },
  typography: {
    useNextVariants: true
  }
})

console.log(theme)

export default theme