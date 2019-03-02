import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import Slideshow from '$comp/slideshow'
import { API_HOST } from '$src/const'
import { formatCurrency } from '$lib/format'

const styles = () => ({
  root: tw`flex flex-col items-center py-8 px-2`,
  title: tw`mb-4`,
  price: tw`mb-8`,
  slideshow: tw`mb-8 w-full text-center`,
  image: tw`h-64 max-w-xs`,
})

const ProductDetail = ({ product_id, fetchProduct, product, classes }) => {
  const [attrs, setAttrs] = useState({})

  useEffect(() => {
    fetchProduct(product_id)
  }, [])

  useEffect(() => {
    if (!product) return
    product.AttributeValues.forEach(av => {
      if (!attrs[av.Attribute.name]) {
        attrs[av.Attribute.name] = []
      }
      attrs[av.Attribute.name].push(av.value)
    })
    setAttrs(attrs)
  }, [product])

  const images = _.values(_.pick(product, ['image', 'image_2']))

  return (
    <Paper className={classes.root}>
      {product && (
        <>
          <Typography variant='h4' className={classes.title}>
            {product.name}
          </Typography>
          <Typography variant='h4' className={classes.price}>
            {formatCurrency(product.price)}
          </Typography>
          <Slideshow className={classes.slideshow}>
            {images && images.map(name => (
              <img key={name} src={`${API_HOST}/${name}`} className={classes.image} />
            ))}
          </Slideshow>
        </>
      )}
    </Paper>
  )
}

export default withStyles(styles)(ProductDetail)