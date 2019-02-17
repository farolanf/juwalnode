import React, { useEffect } from 'react'
import { Link } from "gatsby"

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

  department = department && departments && departments.find(
    d => d.name.toLowerCase() === department.toLowerCase()
  )
  category = category && categories && categories.find(
    c => c.name.toLowerCase() === category.toLowerCase()
  )

  return (
    <div>
      <ul>
        {departments && departments.map(d => (
          <li key={d.department_id}>
            <Link to={'/browse/' + d.name.toLowerCase()}>{d.name}</Link>
          </li>
        ))}
      </ul>
      {department && (
        <ul>
          {categories && categories.map(c => (
            c.department_id === department.department_id && (
              <li key={c.category_id}>
                <Link to={`/browse/${department.name.toLowerCase()}/${c.name.toLowerCase()}`}>{c.name}</Link>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  )
}

export default Browse