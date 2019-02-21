import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  root: {
    width: 240,
    height: 320,
  }
})

const Filter = ({ classes }) => (
  <div className={classes.root}>
    Filter
  </div>
)

export default withStyles(styles)(Filter)