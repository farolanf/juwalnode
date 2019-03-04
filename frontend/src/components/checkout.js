import React from 'react'
import { Link } from 'gatsby'

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

import commonStyles from '$styles/common'
import { formatCurrency } from '$lib/format'

const styles = theme => ({
  ...commonStyles(theme),
  root: tw`my-8 xs:px-2 md:px-5 py-4`,
  helperLink: {
    ...tw`text-blue cursor-pointer`,
    '&:hover': tw`text-blue-light`,
  }
})

const Checkout = ({
  setShipping,
  shippingRegion,
  shippings,
  shipping,
  subTotal,
  shippingCost,
  total,
  classes,
}) => {
  function handleChangeShipping (e) {
    setShipping(shippings.find(s => s.shipping_id == e.target.value))
  }  

  return (
    <Paper className={classes.root}>
      <Typography variant='h6'>
        Checkout
      </Typography>
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
          Available options are based on chosen region: <Link to='/profile' className={classes.link}><b className={classes.helperLink}>{shippingRegion.shipping_region}</b></Link>
        </FormHelperText>
      </FormControl>
      <Grid container>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(Checkout)