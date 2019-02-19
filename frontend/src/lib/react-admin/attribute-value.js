import React from 'react'
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  ReferenceField,
  TextInput,
  SelectInput,
  DisabledInput,
  ReferenceInput,
  EditButton,
} from 'react-admin'

export const AttributeValueList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="attribute_id" reference="attributes"><TextField source="name" /></ReferenceField>
      <TextField source="value" />
      <EditButton />
    </Datagrid>
  </List>
)

export const AttributeValueEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput source="attribute_id" reference="attributes"><SelectInput optionText="name" /></ReferenceInput>
      <TextInput source="value" />
    </SimpleForm>
  </Edit>
)

export const AttributeValueCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="attribute_id" reference="attributes"><SelectInput optionText="name" /></ReferenceInput>
      <TextInput source="value" />
    </SimpleForm>
  </Create>
)