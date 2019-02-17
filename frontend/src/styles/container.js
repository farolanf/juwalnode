export default theme => ({
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: theme.breakpoints.values.md
  },
})