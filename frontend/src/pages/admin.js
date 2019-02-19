import React from 'react'
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import dataProvider from '$src/lib/react-admin/data-provider'
import authProvider from '$src/lib/react-admin/auth-provider'
import {
  DepartmentList,
  DepartmentEdit,
  DepartmentCreate
} from '$src/lib/react-admin/department'
import {
  CategoryList,
  CategoryEdit,
  CategoryCreate
} from '$src/lib/react-admin/category'
import {
  ProductcategoryList,
  ProductcategoryEdit,
  ProductcategoryCreate
} from '$src/lib/react-admin/product-category'
import {
  ProductList,
  ProductEdit,
  ProductCreate
} from '$src/lib/react-admin/product'
import {
  ProductAttributeList,
  ProductAttributeEdit,
  ProductAttributeCreate
} from '$src/lib/react-admin/product-attribute'
import {
  AttributeList,
  AttributeEdit,
  AttributeCreate
} from '$src/lib/react-admin/attribute'
import {
  AttributeValueList,
  AttributeValueEdit,
  AttributeValueCreate
} from '$src/lib/react-admin/attribute-value'

const Page = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name='departments'
      list={DepartmentList}
      edit={DepartmentEdit}
      create={DepartmentCreate}
    />
    <Resource
      name='categories'
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
    />
    <Resource
      name='productcategories'
      list={ProductcategoryList}
      edit={ProductcategoryEdit}
      create={ProductcategoryCreate}
    />
    <Resource
      name='products'
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <Resource
      name='productattributes'
      list={ProductAttributeList}
      edit={ProductAttributeEdit}
      create={ProductAttributeCreate}
    />
    <Resource
      name='attributes'
      list={AttributeList}
      edit={AttributeEdit}
      create={AttributeCreate}
    />
    <Resource
      name='attributevalues'
      list={AttributeValueList}
      edit={AttributeValueEdit}
      create={AttributeValueCreate}
    />
  </Admin>
)

export default Page
