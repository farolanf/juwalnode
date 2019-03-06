import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router';
import { Link } from 'gatsby'

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
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

import commonStyles from '$src/styles/common'

import { PREFIX, API_HOST } from '$src/const'
import { getItem } from '$lib/helpers'
import { formatCurrency } from '$lib/format'

const styles = theme => ({
  ...commonStyles(theme),
  root: tw`my-8 relative`,
  scroll: tw`overflow-x-auto`,
  actions: tw`p-8`,
  updateCart: tw`whitespace-no-wrap`,
  itemTitle: tw`my-2`,
  itemImage: tw`mb-2`,
})

const DeleteItemDialog = ({ open, onClose, onDelete, item }) => {
  function handleDelete () {
    onClose()
    onDelete()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete item?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {item && (
            <>
              {item.Product.name} ({formatAttrs(item.attrs)}) x {item.quantity}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

const Cart = ({
  fetchCart,
  items,
  setCartItemQuantity,
  updateCartItem,
  deleteCartItem,
  classes,
  width,
  subTotal,
  shipping,
  total,
  dirty,
}) => {
  useEffect(() => {
    fetchCart()
  }, [])

  const [deleteItem, setDeleteItem] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const createChangeQuantityHandler = id => e => {
    setCartItemQuantity(id, e.target.value)
  }

  const createDeleteItemHandler = item => () => {
    setDeleteItem(item)
    setDeleteDialogOpen(true)
  }

  const handleDoDeleteItem = () => {
    deleteCartItem(deleteItem)
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
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items && items.map((item, i) => (
              <TableRow key={i}>
                <TableCell padding='dense'>{i + 1}</TableCell>
                <TableCell>
                  <Grid container direction='column'>
                    <div className={classes.itemTitle}>{item.Product.name}</div>
                    <img src={`${API_HOST}/${item.Product.thumbnail}`} width='80' className={classes.itemImage} />
                  </Grid>
                </TableCell>
                <TableCell>{formatAttrs(item.attrs)}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    className={classes.iconButton}
                    onClick={createDeleteItemHandler(item)}
                  >
                    <FontAwesomeIcon icon={faTrash} className={classes.iconSmall} />
                  </IconButton>
                </TableCell>
                <TableCell align='right'>{formatCurrency(item.Product.price)}</TableCell>
                <TableCell align='center'>
                  <TextField
                    type='number'
                    value={item.quantity}
                    onChange={createChangeQuantityHandler(item.item_id)}
                    style={tw`w-10`}
                    inputProps={{
                      min: 1,
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
              <TableCell colSpan={5} />
              <TableCell align='center'>
                <Button
                  variant='outlined'
                  size='small'
                  color='secondary'
                  className={classes.updateCart}
                  onClick={handleUpdateCart}
                  disabled={!dirty}
                >
                  Update cart
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {isWidthUp('md', width) && (
              <>
                <TableRow>
                  <TableCell colSpan={6} align='right'>
                    Sub total
                  </TableCell>
                  <TableCell align='right'>{formatCurrency(subTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} align='right'>
                    Shipping &amp; handling
                  </TableCell>
                  <TableCell align='right'>{formatCurrency(shipping)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} align='right'>
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
              <TableCell align='right'>
                Sub total
              </TableCell>
              <TableCell align='right'>{formatCurrency(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
                Shipping &amp; handling
              </TableCell>
              <TableCell align='right'>{formatCurrency(shipping)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
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
            <Button variant='outlined' onClick={handleContinueShopping}>
              Continue shopping
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='primary' disabled={!items || !items.length}>
              <Link to='/checkout' className={classes.link}>
                Proceed to checkout
              </Link>
            </Button>
          </Grid>
        </Grid>
      </div>
      <DeleteItemDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={handleDoDeleteItem}
        item={deleteItem}
      />
    </Paper>
  )
}

export default withStyles(styles)(withWidth()(Cart))

function formatAttrs(attrs) {
  return attrs.map(attr => `${attr.name}=${attr.value}`).join(', ')
}