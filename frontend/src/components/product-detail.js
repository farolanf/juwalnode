import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import Slideshow from '$comp/slideshow'
import { API_HOST } from '$src/const'
import { formatCurrency } from '$lib/format'

const styles = theme => ({
  root: tw`flex flex-col items-center pt-8 px-2`,
  title: tw`mb-4`,
  attrTitle: tw`mb-4 xs:text-center md:text-left xs:text-xl md:text-base`,
  price: tw`mb-8`,
  slideshow: tw`mb-8 w-full text-center`,
  image: tw`max-w-xs`,
  container: tw`mb-8 flex xs:justify-center md:justify-start`,
  rightContainer: tw`xs:justify-start md:justify-center`,
  dotColor: {
    ...tw`w-5 h-5 border border-solid border-grey-light rounded-full cursor-pointer relative`,
    '&:not(:last-child)': tw`mr-4`,
  },
  dotColorActive: {
    boxShadow: '0 0 0 4px white, 0 0 0 5px lightgrey',
  },
  size: {
    '&:not(:last-child)': tw`mr-4`,
  },
  quantityContainer: {
    [theme.breakpoints.up('md')]: {
      marginLeft: -20
    },
  },
  quantity: {
    ...tw`text-center w-16`,
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': tw`hidden`,
  },
  inputSpinner: {
    width: 48,
    height: 48,
    ...tw`text-3xl`,
    lineHeight: 1,
  },
})

const ProductDetail = ({ product_id, fetchProduct, product, addCartItem, classes }) => {
  const [attrs, setAttrs] = useState(null)
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct(product_id)
  }, [])

  useEffect(() => {
    if (!product) {
      setAttrs(null)
      return
    }
    const _attrs = {}
    product.AttributeValues.forEach(av => {
      if (!_attrs[av.Attribute.name]) {
        _attrs[av.Attribute.name] = []
      }
      _attrs[av.Attribute.name].push(av.value)
    })
    setAttrs(_attrs)
  }, [product])

  const images = _.values(_.pick(product, ['image', 'image_2']))

  function handleAddCartItem () {
    addCartItem({
      product_id,
      attrs: [
        { name: 'Color', value: color },
        { name: 'Size', value: size },
      ],
      quantity,
    })
  }

  return (
    <Paper className={classes.root}>
      {product && (
        <Grid container>
          <Grid item xs={12} md container direction='column' alignItems='center'>
            <Typography variant='h4' className={classes.title}>
              {product.name}
            </Typography>
            <Typography variant='h5' color='secondary' className={classes.price}>
              {formatCurrency(product.price)}
            </Typography>
            <Slideshow className={classes.slideshow}>
              {images && images.map(name => (
                <img key={name} src={`${API_HOST}/${name}`} className={classes.image} />
              ))}
            </Slideshow>
          </Grid>
          <Grid item xs={12} md container direction='column' className={classes.rightContainer}>
            <Grid item>
              {attrs && attrs.Color && attrs.Color.length && (
                <>
                  <Typography color='textSecondary' className={classes.attrTitle}>
                    Color
                  </Typography>
                  <div className={classes.container}>
                    {attrs.Color.map((_color, i) => (
                      <span 
                        key={i}
                        className={cn(classes.dotColor, 
                          _color === color && classes.dotColorActive)} 
                        style={{ backgroundColor: _color }}
                        onClick={() => setColor(_color)}
                      />
                    ))}
                  </div>
                </>
              )}
            </Grid>
            <Grid item>
              {attrs && attrs.Size && attrs.Size.length && (
                <>
                  <Typography color='textSecondary' className={classes.attrTitle}>
                    Size
                  </Typography>
                  <div className={classes.container}>
                    {attrs.Size.map((_size, i) => (
                      <Button 
                        key={i} 
                        variant={_size === size ? 'contained' : 'outlined'}
                        color={_size === size ? 'secondary' : 'default'}
                        size='small'
                        className={classes.size}
                        onClick={() => setSize(_size)}
                      >
                        {_size}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </Grid>
            <Grid item>
              <Typography color='textSecondary' className={classes.attrTitle}>
                Quantity
              </Typography>
              <div className={cn(classes.container, classes.quantityContainer)}>
                <IconButton 
                  className={classes.inputSpinner}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </IconButton>
                <TextField 
                  type='number'
                  value={quantity} 
                  onChange={e => setQuantity(e.target.value)}
                  inputProps={{ 
                    className: classes.quantity,
                    min: 1,
                  }}
                />
                <IconButton 
                  className={classes.inputSpinner}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </IconButton>
              </div>
            </Grid>
            <Grid item container className={classes.container}>
              <Button 
                variant='contained' 
                color='primary'
                onClick={handleAddCartItem}
                disabled={!color || !size}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Paper>
  )
}

export default withStyles(styles)(ProductDetail)