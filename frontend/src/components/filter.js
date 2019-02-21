import React from 'react'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  root: {
    width: 240,
    height: 320,
  }
})

const Filter = ({
  classes,
  products,
  filters,
  toggleDepartment,
}) => {
  const departments = products && products.aggregations.all.search.departments.name.buckets

  return (
    <div className={classes.root}>
      {departments && departments.map(d => (
        <div key={d.key}>
          <label>
            <input type='checkbox' onChange={() => toggleDepartment(d.key)} />
            {d.key}
          </label>
        </div>
      ))}
    </div>
  )
}

export default withStyles(styles)(Filter)