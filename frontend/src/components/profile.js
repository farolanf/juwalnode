import React, { useEffect } from 'react'
import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { Formik, Form } from 'formik'
import FormikTextField from '$comp/formik-text-field'
import schema from '$src/schemas/profile'

const styles = () => ({
  root: tw`py-8 xs:px-4 md:px-8`,
  column: tw`md:pr-4`,
  container: tw`mt-4 xs:justify-center md:justify-start`,
})

const Profile = ({ 
  customer, 
  updateCustomer, 
  fetchShippingRegions, 
  fetchShippings, 
  classes 
}) => {
  useEffect(() => {
    fetchShippingRegions()
    fetchShippings()
  }, [])

  function onSubmit (values, actions) {
    values = schema.cast(values, { stripUnknown: true })
    updateCustomer({ 
      values: {
        ...values,
        customer_id: customer.customer_id,
      }, 
      actions 
    })
  }  

  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={_.defaults({}, customer, {
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
        })}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
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
            </Grid>
            <Grid container className={classes.container}>
              <Button
                type='submit'
                variant='contained' 
                color='primary' 
                disabled={isSubmitting}
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

export default withStyles(styles)(Profile)