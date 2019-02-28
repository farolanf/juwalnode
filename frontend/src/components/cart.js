import React, { useEffect } from 'react'
import { navigate } from '@reach/router';

import withStyles from '@material-ui/core/styles/withStyles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

import commonStyles from '$src/styles/common'

import { PREFIX } from '$src/const'
import { getItem } from '$lib/helpers'

const styles = theme => ({
  ...commonStyles(theme),
  root: tw`my-8 relative`,
  scroll: tw`overflow-x-auto`,
  actions: tw`p-8`,
  updateCart: tw`whitespace-no-wrap`,
})

const Cart = ({
  fetchCart,
  items,
  setCartItemQuantity,
  updateCartItem,
  classes,
  width
}) => {
  useEffect(() => {
    fetchCart()
  }, [])

  const shipping = 15
  const subTotal = (items || []).reduce((acc, item) => {
    return acc + (item.quantity * item.Product.price)
  }, 0)
  const total = subTotal + shipping

  const createChangeQuantityHandler = i => e => {
    setCartItemQuantity(i, e.target.value)
  }

  const handleUpdateCart = () => {
    items.forEach(item => {
      if (item._dirty) {
        updateCartItem(item)
      }
    })
  }

  const handleContinueShopping = () => {
    navigate(getItem('lastShopping', PREFIX + '/browse'))
  }

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant='h6'>
          Shopping Cart
        </Typography>
      </Toolbar>
      <div className={classes.scroll}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='dense'>#</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Attributes</TableCell>
              <TableCell align='center'>Actions</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items && items.map((item, i) => (
              <TableRow key={i}>
                <TableCell padding='dense'>{i + 1}</TableCell>
                <TableCell>{item.Product.name}</TableCell>
                <TableCell>{formatAttrs(item.attrs)}</TableCell>
                <TableCell align='center'>
                  <IconButton className={classes.iconButton}>
                    <FontAwesomeIcon icon={faTrash} className={classes.iconSmall} />
                  </IconButton>
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    type='number'
                    value={item.quantity}
                    onChange={createChangeQuantityHandler(i)}
                    style={tw`w-10`}
                    inputProps={{
                      min: 0,
                      style: tw`text-right`
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  {formatCurrency(item.quantity * item.Product.price)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align='center'>
                <Button
                  variant='outlined'
                  size='small'
                  color='secondary'
                  className={classes.updateCart}
                  onClick={handleUpdateCart}
                >
                  Update cart
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {isWidthUp('md', width) && (
              <>
                <TableRow>
                  <TableCell colSpan={5} align='right'>
                    Sub total
                  </TableCell>
                  <TableCell align='right'>{formatCurrency(subTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align='right'>
                    Shipping &amp; handling
                  </TableCell>
                  <TableCell align='right'>{formatCurrency(shipping)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align='right'>
                    Total
                  </TableCell>
                  <TableCell align='right'>{formatCurrency(total)}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {!isWidthUp('md', width) && (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align='right'>
                Sub total
              </TableCell>
              <TableCell align='right'>{formatCurrency(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align='right'>
                Shipping &amp; handling
              </TableCell>
              <TableCell align='right'>{formatCurrency(shipping)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align='right'>
                Total
              </TableCell>
              <TableCell align='right'>{formatCurrency(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <div className={classes.actions}>
        <Grid container spacing={24} justify={isWidthUp('md', width) ? 'flex-end' : 'center'}>
          <Grid item>
            <Button variant='contained' color='secondary' onClick={handleContinueShopping}>
              Continue shopping
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='primary'>
              Proceed to checkout
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(withWidth()(Cart))

function formatAttrs(attrs) {
  return attrs.map(attr => `${attr.name}=${attr.value}`).join(', ')
}

function formatCurrency(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code'
  }).format(num)
}