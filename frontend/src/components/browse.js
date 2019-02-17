import React, { useEffect } from 'react'

const Browse = ({ department, category, fetchDepartments }) => {
  useEffect(() => {
    fetchDepartments()
  }, [])
  return (
    <div>
      Browse {department} {category} :)
    </div>
  )
}

export default Browse