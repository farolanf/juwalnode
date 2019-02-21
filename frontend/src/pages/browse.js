import React, { } from "react"
import { Router } from '@reach/router'

import Layout from "$comp/layout"
import SEO from "$comp/seo"
import Browse from '$con/browse'

const Page = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Browse path='/search' />
      <Browse path='/browse' />
      <Browse path='/browse/:department' />
      <Browse path='/browse/:department/:category' />
    </Router>
  </Layout>
)

export default Page
