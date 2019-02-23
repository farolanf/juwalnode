import React from 'react'
import qs from 'qs'
import Layout from '$comp/layout'
import { saveToken, verify, loginRedirect } from '$lib/auth'

const SessionPage = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  saveToken(query.token)
  verify().then(() => loginRedirect())
  return (
    <Layout>
      <div>Saving session...</div>
    </Layout>
  )
}

export default SessionPage