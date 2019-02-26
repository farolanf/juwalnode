import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import { API_HOST } from '$src/const'

const styles = () => ({
  root: {
    height: 320,
  },
  media: tw`mx-auto mt-5 mb-2 w-48 h-48`,
  content: tw`text-center`,
  title: tw`text-base font-bold`,
})

const Product = ({ classes, item }) => (
  <Card className={classes.root}>
    <CardActionArea>
      <CardMedia image={`${API_HOST}/${item._source.image}`} className={classes.media} />
      <CardContent className={classes.content}>
        <div className={classes.title}>
          {item._source.name}
        </div>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default withStyles(styles, { name: 'product' })(Product)