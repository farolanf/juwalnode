import React, { useEffect } from 'react'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

import { Formik, Form } from 'formik'
import FormikTextField from '$comp/formik-text-field'
import schema from '$src/schemas/profile'

const styles = () => ({
  root: tw`my-8 py-8 xs:px-4 md:px-8`,
  column: tw`md:pr-4`,
  container: tw`mt-4 xs:justify-center md:justify-start`,
})

const ShippingRegionSelect = ({ value, handleChange, shippingRegions }) => (
  <FormControl margin='normal'>
    <InputLabel>Shipping Region</InputLabel>
    <Select
      native
      name='shipping_region_id'
      value={value}
      onChange={handleChange}
    >
      {shippingRegions && shippingRegions
        .map(sr => (
          <option
            key={sr.shipping_region_id}
            value={sr.shipping_region_id}
          >
            {sr.shipping_region}
          </option>
        ))}
    </Select>
  </FormControl>
)

const Profile = ({ 
  customer, 
  updateCustomer, 
  fetchShippingRegions, 
  fetchShippings, 
  shippingRegions,
  classes,
  width,
}) => {
  useEffect(() => {
    fetchShippingRegions()
    fetchShippings()
  }, [])

  const initialValues = _.assignWith(
    {}, 
    schema.cast(customer || {}, { stripUnknown: true }), 
    {
      address_1: '',
      address_2: '',
      city: '',
      region: '',
      postal_code: '',
      country: '',
      shipping_region_id: 1,
      day_phone: '',
      eve_phone: '',
      mob_phone: '',
    },
    (dst, src) => !dst ? src : dst
  )

  const getValues = values => {
    values = schema.cast(values, { stripUnknown: true })
    return {
      ...values,
      customer_id: customer.customer_id,
    }
  }

  function onSubmit (values, actions) {
    updateCustomer({ 
      values: getValues(values), 
      actions 
    })
  }

  return (
    <Paper className={classes.root}>
      <Typography variant='h6'>
        Profile
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ dirty, values, handleChange, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} md={6} container direction='column' className={classes.column}>
                <FormikTextField
                  name='address_1'
                  label='Address line 1'
                  fullWidth
                  margin='normal'
                />
                <FormikTextField
                  name='address_2'
                  label='Address line 2'
                  fullWidth
                  margin='normal'
                />
                <FormikTextField
                  name='city'
                  label='City'
                  fullWidth
                  margin='normal'
                />
                {isWidthUp('md', width) && (
                  <ShippingRegionSelect 
                    value={values.shipping_region_id}
                    handleChange={handleChange}
                    shippingRegions={shippingRegions}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} container direction='column'>
                <FormikTextField
                  name='region'
                  label='Region'
                  fullWidth
                  margin='normal'
                />
                <FormikTextField
                  name='postal_code'
                  label='Postal code'
                  fullWidth
                  margin='normal'
                />
                <FormikTextField
                  name='country'
                  label='Country'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              {!isWidthUp('md', width) && (
                  <ShippingRegionSelect 
                    value={values.shipping_region_id}
                    handleChange={handleChange}
                    shippingRegions={shippingRegions}
                  />
                )}
            </Grid>
            <Grid container className={classes.container}>
              <Button
                type='submit'
                variant='contained' 
                color='primary' 
                disabled={isSubmitting || !dirty}
              >
                Save
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}

export default withWidth()(withStyles(styles)(Profile))