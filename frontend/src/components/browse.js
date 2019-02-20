import React, { useState, useEffect } from 'react'
import { Link } from "gatsby"
import { navigate } from '@reach/router'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Browse = ({
  department,
  category,
  fetchDepartments,
  fetchCategories,
  fetchProducts,
  departments,
  categories,
  products
}) => {
  useEffect(() => {
    fetchDepartments()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts({ department, category })
  }, [department, category])

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
      && navigate(`/browse/${department.toLowerCase()}/${departmentCategories[val].name.toLowerCase()}`)
  }

  return (
    <div>
      <Tabs value={tab} onChange={handleChangeTab}>
        {departmentCategories && departmentCategories.map(c => (
          <Tab key={c.category_id} label={c.name} />
        ))}
      </Tabs>
      {products && products.map(p => (
        <div key={p.product_id}>{p.name}</div>
      ))}
    </div>
  )
}

export default Browse