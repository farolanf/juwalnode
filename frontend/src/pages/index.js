import React, { } from "react"
import { Router } from '@reach/router'

import Layout from "$comp/layout"
import SEO from "$comp/seo"
import Browse from '$con/browse'
import Cart from '$con/cart'
import ProductDetail from '$con/product-detail'
import Profile from '$con/profile'
import Checkout from '$con/checkout'

const Page = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Browse path='/' />
      <Browse path='/browse/*' />
      <Cart path='/cart' />
      <ProductDetail path='/products/:product_id' />
      <Profile path='/profile' />
      <Checkout path='/checkout' />
    </Router>
  </Layout>
)

export default Page
