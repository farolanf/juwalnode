import React, { useEffect } from 'react'
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

const styles = theme => ({
  root: tw``,
  tabs: tw`mb-4`,
  topPagination: tw`pt-4 pb-2 px-2`,
  bottomPagination: tw`pt-2 pb-8 px-2`,
  productContainer: {
    ...tw`py-2`,
    [theme.breakpoints.up('md')]: {
      ...tw`p-2`
    }
  }
})

const PaginationRow = ({ className, total, offset, count, end, onClick }) => (
  <Grid item container justify='space-between' alignItems='center' className={className}>
    <Grid item>
      {total} items
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
      {offset + 1}-{end} of {total}
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

  const departmentObj = department
    && departments
    && departments.find(d => d.name.toLowerCase() === department.toLowerCase())

  // department categories
  const departmentCategories = departmentObj
    && categories
    && categories.filter(c => c.department_id === departmentObj.department_id)
    || []

  const tab = !category 
    ? 0 
    : 1 + departmentCategories.findIndex(c => 
      c.name.toLowerCase() === category.toLowerCase())

  const handleChangeTab = (e, val) => {
    // navigate to /browse/department
    if (val === 0) {
      department
        && navigate(PREFIX + `/browse/${department.toLowerCase()}`)
      return
    }

    // navigate to /browse/department/category
    val--

    department
      && departmentCategories
      && departmentCategories.length > val
      && category !== departmentCategories[val].name
      && navigate(PREFIX + `/browse/${department.toLowerCase()}/${departmentCategories[val].name.toLowerCase()}`)
  }

  const end = Math.min((products && products.hits.total), offset + count)

  return (
    <div className={classes.root}>
      {(department || category) && (
        <Tabs value={tab} onChange={handleChangeTab} className={classes.tabs}>
          <Tab key={0} label={`All in ${department}`} />
          {departmentCategories && departmentCategories.map(c => (
            <Tab key={c.category_id} label={c.name} />
          ))}
        </Tabs>
      )}
      <Grid container>
        <Grid item xs={12} md style={{ maxWidth: 240 }}>
          <Filter />
        </Grid>
        <Grid item xs={12} md container direction='column'>
          <PaginationRow
            className={classes.topPagination}
            total={products ? products.hits.total : 0}
            offset={offset}
            count={count}
            end={end}
            onClick={(e, offset) => setOffset(offset)}
          />
          <Grid item container justify='center'>
            {_.get(products, 'hits.hits', []).map(p => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={p._id} 
                container 
                justify='center'
                className={classes.productContainer}
              >
                <Product item={p} />
              </Grid>
            ))}
          </Grid>
          <PaginationRow
            className={classes.bottomPagination}
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

export default withStyles(styles)(Browse)

// init filters from query string
function filtersFromUrl (setFilters) {
  // const query = queryString.parse(window.location.search)
  // if (query.attributes) {
  //   query.attributes = JSON.parse(query.attributes)
  // }
  // setFilters(query)
}