import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import indigo from '@material-ui/core/colors/indigo'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
  },
  typography: {
    useNextVariants: true
  }
})

export default theme