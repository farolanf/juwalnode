import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  ReferenceField,
  SelectInput,
  ReferenceInput,
  EditButton,
} from 'react-admin'
import ImageField from './image-field'

export const ProductcategoryList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="product_id" reference="products"><TextField source="name" /></ReferenceField>
      <ReferenceField source="product_id" reference="products" sortable={false}>
        <ImageField source="thumbnail" style={tw`w-16`} />
      </ReferenceField>
      <ReferenceField source="category_id" reference="categories"><TextField source="name" /></ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductcategoryEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="product_id" reference="products"><SelectInput optionText="name" disabled /></ReferenceInput>
      <ReferenceInput source="category_id" reference="categories"><SelectInput optionText="name" /></ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductcategoryCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="product_id" reference="products"><SelectInput optionText="name" /></ReferenceInput>
      <ReferenceInput source="category_id" reference="categories"><SelectInput optionText="name" /></ReferenceInput>
    </SimpleForm>
  </Create>
)