import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import indigo from '@material-ui/core/colors/indigo'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
    error: red,
    info: blue,
    success: green,
    warning: amber,
  },
  typography: {
    useNextVariants: true
  }
})

export default theme