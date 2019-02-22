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
  toggleCategory,
  toggleAttribute,
}) => {
  const departments = products && products.aggregations.all.search.departments.name.buckets
  const categories = products && products.aggregations.all.search.categories.name.buckets
  const attributes = products && products.aggregations.all.search.attributes.name.buckets

  return (
    <div className={classes.root}>
      <h5>Departments</h5>
      {departments && departments.map(d => (
        <div key={d.key}>
          <label>
            <input
              type='checkbox'
              checked={filters.get('departments').includes(d.key)}
              onChange={() => toggleDepartment(d.key)}
            />
            {d.key}
          </label>
        </div>
      ))}
      <h5>Categories</h5>
      {categories && categories.map(d => (
        <div key={d.key}>
          <label>
            <input
              type='checkbox'
              checked={filters.get('categories').includes(d.key)}
              onChange={() => toggleCategory(d.key)}
            />
            {d.key}
          </label>
        </div>
      ))}
      <h5>Attributes</h5>
      {attributes && attributes.map(d => (
        <div key={d.key}>
          <p>{d.key}</p>
          {d.value.buckets.map(v => (
            <div key={v.key}>
              <label>
                <input
                  type='checkbox'
                  checked={!!filters.get('attributes').find(
                    a => a.name === d.key && a.value === v.key
                  )}
                  onChange={() => toggleAttribute(d.key, v.key)}
                />
                {v.key}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default withStyles(styles)(Filter)