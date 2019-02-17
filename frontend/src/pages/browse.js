import React, { } from "react"
import { Link } from "gatsby"
import { Router, navigate } from '@reach/router'
import queryString from 'query-string'

import Layout from "$comp/layout"
import SEO from "$comp/seo"

const Browse = ({ department, category }) => (
  <div>
    Browse {department} {category}
  </div>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/browse/regional'>Regional</Link></li>
      <li><Link to='/browse/regional/french'>Regional - French</Link></li>
    </ul>
    <Router>
      <Browse path='/browse/:department' />
      <Browse path='/browse/:department/:category' />
    </Router>
  </Layout>
)

export default IndexPage
