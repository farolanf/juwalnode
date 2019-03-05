import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'

import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

import Cover from '$comp/cover'
import commonStyles from '$styles/common'
import { formatCurrency } from '$lib/format'

import { createOrder, captureOrder } from '$lib/paypal'

const styles = theme => ({
  ...commonStyles(theme),
  root: tw`my-8 xs:px-2 md:px-5 py-4`,
  helperLink: {
    ...tw`text-blue cursor-pointer`,
    '&:hover': tw`text-blue-light`,
  },
  payments: tw`relative`,
})

const Checkout = ({
  setShipping,
  shippingRegion,
  shippings,
  shipping,
  subTotal,
  shippingCost,
  total,
  paypal,
  classes,
}) => {
  const paypalContainerId = 'paypal-button-container'

  useEffect(() => {
    if (!paypal || !shipping) return
    document.getElementById(paypalContainerId).innerHTML = ''
    paypal.Buttons({
      createOrder: () => {
        return createOrder({ shipping_id: shipping.shipping_id })
          .then(res => res.data.orderID)
      },
      onApprove: (data) => {
        return captureOrder(data.orderID)
          .then(() => {
            navigate('/checkout-complete')
          })
      }
    }).render('#' + paypalContainerId)
  }, [paypal, shipping])

  function handleChangeShipping (e) {
    setShipping(shippings.find(s => s.shipping_id == e.target.value))
  }  

  return (
    <Paper className={classes.root}>
      <Typography variant='h6'>
        Checkout
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <FormControl margin='normal'>
            <InputLabel>Shipping</InputLabel>
            <Select 
              native
              value={shipping && shipping.shipping_id}
              onChange={handleChangeShipping}
            >
              <option>Please select</option>
              {shippings && shippings.map(s => (
                <option key={s.shipping_id} value={s.shipping_id}>
                  {s.shipping_type}
                </option>
              ))}
            </Select>
            <FormHelperText>
              Available options are based on chosen region: {shippingRegion && (
                <Link to='/profile' className={classes.link}>
                  <b className={classes.helperLink}>{shippingRegion.shipping_region}</b>
                </Link>
              )}
            </FormHelperText>
          </FormControl>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align='right'>
                  Sub total
                </TableCell>
                <TableCell align='right'>{formatCurrency(subTotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Shipping</TableCell>
                <TableCell align='right'>{formatCurrency(shippingCost)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>{formatCurrency(total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md container direction='column' alignItems='center' className={classes.payments}>
          <Typography variant='overline' paragraph>Pay with</Typography>
          <div id={paypalContainerId} dangerouslySetInnerHTML={{ __html: '' }} />
          <Cover show={!shipping}>Please choose shipping method</Cover>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(Checkout)