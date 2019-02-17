import React from "react"
import { Admin, Resource, ListGuesser } from 'react-admin'
import dataProvider from '$src/lib/data-provider'

const Page = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name='Departments' list={ListGuesser} />
  </Admin>
)

export default Page
