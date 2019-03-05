import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    ...tw`absolute pin flex justify-center items-start bg-transparent text-transparent text-2xl font-bold rounded pt-16`,
    zIndex: 10000,
    opacity: 0.9,
    transition: theme.transitions.create(['background-color', 'color']),
  },
  enter: tw`bg-white text-black`,
})

const Cover = ({ show, children, enterClass, classes }) => {
  const [_show, setShow] = useState()
  const [enter, setEnter] = useState()

  useEffect(() => {
    if (show) {
      setShow(true)
      setTimeout(() => {
        setEnter(enterClass || classes.enter)
      }, 25)
    } else {
      setEnter()
      setTimeout(() => {
        setShow(false)        
      }, 300)
    }
  }, [show])

  return (
    show || _show ? (
      <div className={cn(classes.root, enter)}>
        {children}
      </div>
    ) : null
  )
}

export default withStyles(styles)(Cover)