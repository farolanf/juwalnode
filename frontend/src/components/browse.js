import React, { useEffect } from 'react'

const Browse = ({ department, category, fetchDepartments, fetchCategories }) => {
  useEffect(() => {
    fetchDepartments()
    fetchCategories()
  }, [])
  return (
    <div>
      Browse {department} {category} :)
    </div>
  )
}

export default Browse