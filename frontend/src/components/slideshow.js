import React, { useState } from 'react'
import cn from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import SwipeableViews from 'react-swipeable-views'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'

const styles = theme => ({
  root: tw`relative`,
  arrow: {
    transition: theme.transitions.create('color'),
    ...tw`text-2xl text-grey black absolute cursor-pointer`,
    '&:hover': tw`text-black`,
    top: '40%',
  },
  arrowLeft: {
    left: 25,
  },
  arrowRight: {
    right: 25,
  },
  dots: tw`p-0 mt-4`,
  dot: {
    transition: theme.transitions.create('background-color'),
    ...tw`inline-block w-4 h-4 border border-white rounded-full bg-grey-light cursor-pointer`,
    '&:not(:last-child)': {
      ...tw`mr-3`,
    }
  },
  dotActive: tw`bg-grey-dark`,
})

const Slideshow = ({ className, classes, children }) => {
  const [index, setIndex] = useState(0)

  return (
    <div className={cn(classes.root, className)}>
      <SwipeableViews index={index} onChangeIndex={i => setIndex(i)}>
        {children}
      </SwipeableViews>
      <FontAwesomeIcon 
        icon={faChevronLeft} 
        className={cn(classes.arrow, classes.arrowLeft)}
        onClick={() => setIndex(index - 1 < 0 ? children.length - 1 : index - 1)}
      />
      <FontAwesomeIcon 
        icon={faChevronRight}
        className={cn(classes.arrow, classes.arrowRight)} 
        onClick={() => setIndex((index + 1) % children.length)}
      />
      <ul className={classes.dots}>
        {children && children.map((_, i) => (
          <li 
            key={i}
            className={cn(classes.dot, i === index && classes.dotActive)}
            onClick={() => setIndex(i)}
          />
        ))}
      </ul>
    </div>
  )
}

export default withStyles(styles)(Slideshow)