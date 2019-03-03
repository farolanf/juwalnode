import React from 'react'
import { navigate } from '@reach/router'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import { API_HOST } from '$src/const'
import { formatCurrency } from '$lib/format'

const styles = () => ({
  root: tw`flex flex-col w-full items-center pt-4`,
  media: tw`m-auto xs:h-64 md:h-48 bg-contain`,
  content: tw`text-center`,
  title: tw`text-base font-bold mb-4`,
  price: tw`text-base mb-4`,
  actions: tw`justify-center flex-grow`,
})

const Product = ({ classes, item }) => {
  function handleViewDetail () {
    navigate('/products/' + item._id)
  }
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleViewDetail}>
        <CardMedia image={`${API_HOST}/${item._source.image}`} className={classes.media} />
        <CardContent className={classes.content}>
          <div className={classes.title}>
            {item._source.name}
          </div>
          <div className={classes.price}>
            {formatCurrency(item._source.price)}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(Product)