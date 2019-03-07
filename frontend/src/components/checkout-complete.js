import React, { useEffect } from 'react'
import Alert from '$comp/alert'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  root: tw`my-8 mx-2`,
})

const CheckoutComplete = ({ fetchCart, classes }) => {
  useEffect(() => {
    fetchCart()
  }, [])
  return (
    <Alert variant='success' message='Thank you. Your order will be processed and your order summary will be emailed to you shortly.' className={classes.root} />
  )
}

export default withStyles(styles)(CheckoutComplete)