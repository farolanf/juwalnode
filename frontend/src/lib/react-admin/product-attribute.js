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
  FormDataConsumer,
  REDUX_FORM_NAME,
} from 'react-admin'
import { change } from 'redux-form'
import { DumpProps } from '$lib/debug'

// eslint-disable-next-line
const NestedReferenceField = ({ translateChoice, ...props }) => (
  <ReferenceField {...props} />
)

// TODO: fix Attribute column click editing wrong record
export const ProductAttributeList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source='id' />
      <ReferenceField source="product_id" reference="products">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="attribute_value_id" reference="attributevalues" label='Attribute' linkType={false}>
        <NestedReferenceField source="attribute_id" reference="attributes">
          <TextField source='name' />
        </NestedReferenceField>
      </ReferenceField>
      <ReferenceField source="attribute_value_id" reference="attributevalues">
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
      <ReferenceInput source="attribute_id" reference="attributes" label='Attribute'>
          <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput source="attribute_value_id" reference="attributevalues" label='Attribute'>
        <FormDataConsumer>
          {({ formData, input, choices, dispatch }) => {
            // initialize attribute_id
            if (formData) {
              if (!formData.attribute_id) {
                const record = choices.find(c => c.attribute_value_id === input.value)
                dispatch(change(REDUX_FORM_NAME, 'attribute_id', record.attribute_id))
              } else {
                choices = choices.filter(c => c.attribute_id === formData.attribute_id)
              }
            }
            return <SelectInput source={input.name} choices={choices} optionText='value' />
          }}
        </FormDataConsumer>
      </ReferenceInput>
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