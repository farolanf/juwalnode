export default theme => ({
  ...tw`pt-10 pb-20`,
  [theme.breakpoints.up('md')]: tw`pt-12 pb-24`,
  '& > *': {
    ...tw`mx-auto`,
    width: 'calc(100% - 32px)',
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.sm
    }
  }
})