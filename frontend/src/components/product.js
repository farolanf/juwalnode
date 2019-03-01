import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { API_HOST } from '$src/const'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 330,
  },
  media: tw`mx-auto mt-5 mb-2 w-48 h-48`,
  content: tw`text-center`,
  title: tw`text-base font-bold`,
  actions: tw`justify-center flex-grow`,
})

const Product = ({ classes, item, addCartItem }) => {
  function handleClickAddToCart () {
    addCartItem({
      product_id: item._source.product_id,
      attrs: [
        { name: 'Color', value: 'Orange' },
        { name: 'Size', value: 'M' },
      ],
      quantity: 1,
    })
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia image={`${API_HOST}/${item._source.image}`} className={classes.media} />
        <CardContent className={classes.content}>
          <div className={classes.title}>
            {item._source.name}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={handleClickAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(Product)