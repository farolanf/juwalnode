import React from 'react'
import {
    List,
    Edit,
    Create,
    Datagrid,
    SimpleForm,
    TextField,
    TextInput,
    DisabledInput
} from 'react-admin'

export const DepartmentList = props => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="description" />
      </Datagrid>
  </List>
);

export const DepartmentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const DepartmentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);