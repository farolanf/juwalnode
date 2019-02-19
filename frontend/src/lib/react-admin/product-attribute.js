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

export const ProductAttributeList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source='id' />
      <ReferenceField source="product_id" reference="products"><TextField source="name" /></ReferenceField>
      <ReferenceField source="attribute_value_id" reference="attributevalues" label='Attribute'>
        <ReferenceField source="attribute_id" reference="attributes">
          <TextField source="name" />
        </ReferenceField>
      </ReferenceField>
      <ReferenceField source="attribute_value_id" reference="attributevalues" label='Value'>
        <TextField source="value" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductAttributeEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="product_id" reference="products">
        <SelectInput optionText="name" disabled />
      </ReferenceInput>
      <ReferenceInput source="attribute_value_id" reference="attributevalues"><SelectInput optionText="value" /></ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ProductAttributeCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="product_id" reference="products"><SelectInput optionText="name" /></ReferenceInput>
      <ReferenceInput source="attribute_value_id" reference="attributevalues"><SelectInput optionText="value" /></ReferenceInput>
    </SimpleForm>
  </Create>
)