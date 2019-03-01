import React, { useEffect } from 'react'
import { withSnackbar } from 'notistack'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'

const styles = () => ({
  icon: tw`text-base`  
})

const Notifier = ({ 
  notifications, 
  deleteNotification, 
  enqueueSnackbar, 
  classes 
}) => {
  useEffect(() => {
    notifications.forEach(n => {
      const options = _.defaults({}, n.options, {
        autoHideDuration: 5000,
        action: (
          <IconButton color='inherit'>
            <FontAwesomeIcon icon={faTimes} className={classes.icon} />
          </IconButton>
        ),
      })
      enqueueSnackbar(n.message, options)
      deleteNotification(n.id)
    })
  }, [notifications])  
  return null
}

export default withStyles(styles)(withSnackbar(Notifier))