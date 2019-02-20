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
  departments,
  categories
}) => {
  useEffect(() => {
    fetchDepartments()
    fetchCategories()
  }, [])

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

  // navigate to /browse/department/category
  useEffect(() => {
    department
      && departmentCategories
      && departmentCategories.length > tab
      && category !== departmentCategories[tab].name
      && navigate(`/browse/${department.toLowerCase()}/${departmentCategories[tab].name.toLowerCase()}`)
  }, [tab])

  const handleChangeTab = (e, val) => {
    // remember tab
    department && setLastTabs(Object.assign({}, lastTabs, { [department]: val }))
    setTab(val)
  }

  console.log('render')

  return (
    <div>
      <Tabs value={tab} onChange={handleChangeTab}>
        {departmentCategories && departmentCategories.map(c => (
          <Tab key={c.category_id} label={c.name} />
        ))}
      </Tabs>
    </div>
  )
}

export default Browse