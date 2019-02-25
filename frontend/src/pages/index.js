import React, { } from "react"
import { Router } from '@reach/router'

import Layout from "$comp/layout"
import SEO from "$comp/seo"
import Browse from '$con/browse'

const Page = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Browse path='/' />
      <Browse path='/browse/*' />
    </Router>
  </Layout>
)

export default Page
