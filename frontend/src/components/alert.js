import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'

import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CheckIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon
}

const styles = theme => ({
  root: tw`mb-2`,
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.info[700]
  },
  success: {
    backgroundColor: theme.palette.success[700]
  },
  warning: {
    backgroundColor: theme.palette.warning[700]
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    ...tw`text-xl`,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  }
})

const Alert = ({ variant, message, classes, className, style }) => {
  const Icon = variantIcon[variant]
  return (
    <SnackbarContent
      className={classNames(classes.root, classes[variant], className)}
      style={style}
      message={
        <span className={classes.message}>
          <Icon className={classes.icon} />
          {message}
        </span>
      }
    />
  )
}

Alert.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

Alert.defaultProps = {
  variant: 'info'
}

export default withStyles(styles)(Alert)