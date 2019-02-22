import React from 'react'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const styles = () => ({
  root: {
    width: 240,
  },
  filterGroup: tw`block my-4`,
  checkbox: tw`py-1`,
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
      <FormControl component='fieldset' className={classes.filterGroup}>
        <FormLabel component='legend'>Departments</FormLabel>
        <FormGroup>
          {departments && departments.map(d => (
            <FormControlLabel
              key={d.key}
              control={
                <Checkbox
                  checked={filters.get('departments').includes(d.key) || departments.length === 1}
                  onChange={() => toggleDepartment(d.key)}
                  className={classes.checkbox}
                  disabled={departments.length === 1}
                />
              }
              label={d.key}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component='fieldset' className={classes.filterGroup}>
        <FormLabel component='legend'>Categories</FormLabel>
        <FormGroup>
          {categories && categories.map(d => (
            <FormControlLabel
              key={d.key}
              control={
                <Checkbox
                  checked={filters.get('categories').includes(d.key) || categories.length === 1}
                  onChange={() => toggleCategory(d.key)}
                  className={classes.checkbox}
                  disabled={categories.length === 1}
                />
              }
              label={d.key}
            />
          ))}
        </FormGroup>
      </FormControl>
      {attributes && attributes.map(d => (
        <FormControl component='fieldset' className={classes.filterGroup} key={d.key}>
          <FormLabel component='legend'>{d.key}</FormLabel>
          <FormGroup>
            {d.value.buckets.map(v => (
              <FormControlLabel
                key={v.key}
                control={
                  <Checkbox
                    checked={!!filters.get('attributes').find(
                      a => a.name === d.key && a.value === v.key
                    )}
                    onChange={() => toggleAttribute(d.key, v.key)}
                    className={classes.checkbox}
                  />
                }
                label={v.key}
              />
            ))}
          </FormGroup>
        </FormControl>
      ))}
    </div>
  )
}

export default withStyles(styles)(Filter)