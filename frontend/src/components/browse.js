import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import _ from 'lodash'
import changeCase from 'change-case'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Pagination from 'material-ui-flat-pagination'

import Product from '$con/product'
import Filter from '$con/filter'

import { PREFIX } from '$src/const'
import { setItem } from '$lib/helpers'

const styles = () => ({
  root: tw`pt-4 pb-8`,
  tabs: tw`mb-4`,
  pagination: tw`my-4`
})

const PaginationRow = ({ classes, total, offset, count, end, onClick }) => (
  <Grid item container justify='space-between' alignItems='center' className={classes.pagination}>
    <Grid item>
      Found {total} items
    </Grid>
    <Grid item>
      <Pagination
        limit={count}
        offset={offset}
        total={total}
        onClick={onClick}
      />
    </Grid>
    <Grid item>
        Showing {offset + 1}-{end} of {total}
    </Grid>
  </Grid>
)

const Browse = ({
  classes,
  fetchDepartments,
  fetchCategories,
  fetchProducts,
  departments,
  categories,
  products,
  filters,
  setFilters,
  clearFilters,
  setDepartment,
  setCategory,
  offset,
  count,
  setOffset,
  ...props,
}) => {
  const paths = (props['*'] || '').split('/')
  const department = paths.length && paths[0]
  const category = paths.length > 1 && paths[1]

  // save current last browsing path for 'continue shopping'
  if (typeof window !== 'undefined') {
    setItem('lastShopping', location.pathname + location.search)
  }

  useEffect(() => {
    fetchDepartments()
    fetchCategories()
    !(department || category) && filtersFromUrl(setFilters)
  }, [])

  // clear filters when changing department or category path
  useEffect(() => {
    if (category) {
      clearFilters()
      setCategory(changeCase.upperCaseFirst(category))
    } else if (department) {
      clearFilters()
      setDepartment(changeCase.upperCaseFirst(department))
    }
  }, [department, category])

  useEffect(() => {
    fetchProducts({ ...filters.toJS(), offset, count })
  }, [filters, offset, count])

  let [tab, setTab] = useState(0)
  const [lastTabs, setLastTabs] = useState({})

  // restore tab
  tab = lastTabs[department] || 0
  useEffect(() => {
    setTab(lastTabs[department] || 0)
  }, [department])

  const departmentObj = department
    && departments
    && departments.find(d => d.name.toLowerCase() === department.toLowerCase())

  // department categories
  const departmentCategories = departmentObj
    && categories
    && categories.filter(c => c.department_id === departmentObj.department_id)

  const handleChangeTab = (e, val) => {
    setTab(val)

    // remember tab
    department && setLastTabs(Object.assign({}, lastTabs, { [department]: val }))

    // navigate to /browse/department/category
    department
      && departmentCategories
      && departmentCategories.length > val
      && category !== departmentCategories[tab].name
      && navigate(PREFIX + `/browse/${department.toLowerCase()}/${departmentCategories[val].name.toLowerCase()}`)
  }

  const end = Math.min((products && products.hits.total), offset + count)

  return (
    <div className={classes.root}>
      {(department || category) && (
        <Tabs value={tab} onChange={handleChangeTab} className={classes.tabs}>
          {departmentCategories && departmentCategories.map(c => (
            <Tab key={c.category_id} label={c.name} />
          ))}
        </Tabs>
      )}
      <Grid container wrap='nowrap'>
          <Grid item>
            <Filter />
          </Grid>
          <Grid item container direction='column'>
            <PaginationRow
              classes={classes}
              total={products ? products.hits.total : 0}
              offset={offset}
              count={count}
              end={end}
              onClick={(e, offset) => setOffset(offset)}
            />
            <Grid item container spacing={24}>
              {_.get(products, 'hits.hits', []).map(p => (
                <Grid item xs={12} md={4} xl={3} key={p._id} container justify='center'>
                  <Product item={p} />
                </Grid>
              ))}
            </Grid>
            <PaginationRow
              classes={classes}
              total={products ? products.hits.total : 0}
              offset={offset}
              count={count}
              end={end}
              onClick={(e, offset) => setOffset(offset)}
            />
          </Grid>
      </Grid>
    </div>
  )
}

export default compose(
  withStyles(styles),
  withWidth(),
)(Browse)

// init filters from query string
function filtersFromUrl (setFilters) {
  // const query = queryString.parse(window.location.search)
  // if (query.attributes) {
  //   query.attributes = JSON.parse(query.attributes)
  // }
  // setFilters(query)
}