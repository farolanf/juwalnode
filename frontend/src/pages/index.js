import React, { } from "react"
import { Router } from '@reach/router'

import Layout from "$comp/layout"
import SEO from "$comp/seo"
import Browse from '$con/browse'
import PageNotFound from './_404'

const Page = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Browse path='/' />
      <Browse path='/browse/*' />
      <PageNotFound path='*' />
    </Router>
  </Layout>
)

export default Page
