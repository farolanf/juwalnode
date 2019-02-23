import React from 'react'
import TextField from '@material-ui/core/TextField'
import { connect } from 'formik'

const FormikTextField = ({
  formik: {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  },
  ...props
}) => (
  <TextField
    value={values[props.name]}
    helperText={touched[props.name] && errors[props.name]}
    error={touched[props.name] && !!errors[props.name]}
    onChange={handleChange}
    onBlur={handleBlur}
    {...props}
  />
)

export default connect(FormikTextField)