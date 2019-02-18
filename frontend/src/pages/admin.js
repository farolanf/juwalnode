import React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import dataProvider from '$src/lib/react-admin/data-provider'
import authProvider from '$src/lib/react-admin/auth-provider'
import {
  DepartmentList,
  DepartmentEdit,
  DepartmentCreate
} from '$src/lib/react-admin/department'

const Page = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name='departments'
      list={DepartmentList}
      edit={DepartmentEdit}
      create={DepartmentCreate}
    />
  </Admin>
)

export default Page
