import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  NumberField,
  ReferenceField,
  TextInput,
  LongTextInput,
  NumberInput,
  ImageInput,
  SelectInput,
  DisabledInput,
  ReferenceInput
} from 'react-admin'
import { API_HOST } from '$src/const'

// eslint-disable-next-line
const ImageField = ({ source, record = {}, sortable, basePath, ...props }) => (
  <img src={API_HOST + `/${record[source]}`} {...props} />
)

export const ProductList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="price" />
      <TextField source="discounted_price" />
      <NumberField source="display" />
      <ImageField source="thumbnail" title="Thumbnail" style={tw`w-16`} sortable={false} />
    </Datagrid>
  </List>
)

export const ProductEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <LongTextInput source="description" />
      <TextInput source="price" />
      <TextInput source="discounted_price" />
      <NumberInput source="display" />
      <ImageField source="image" title="Image" style={tw`w-48`} />
      <ImageInput source="image" />
      <ImageField source="image_2" title="Image 2" style={tw`w-48`} />
      <ImageInput source="image_2" />
      <ImageField source="thumbnail" title="Thumbnail 2" style={tw`w-16`} />
      <ImageInput source="thumbnail" />
    </SimpleForm>
  </Edit>
)

export const ProductCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
      <TextInput source="price" />
      <TextInput source="discounted_price" />
      <NumberInput source="display" />
      <ImageField source="image" title="Image" style={tw`w-48`} />
      <ImageInput source="image" />
      <ImageField source="image_2" title="Image 2" style={tw`w-48`} />
      <ImageInput source="image_2" />
      <ImageField source="thumbnail" title="Thumbnail 2" style={tw`w-16`} />
      <ImageInput source="thumbnail" />
    </SimpleForm>
  </Create>
)