import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import withWidth, { isWidthDown } from '@material-ui/core/withWidth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { Formik, Form } from 'formik'
import FormikTextField from '$comp/formik-text-field'

import { API_HOST, PREFIX } from '$src/const'
import { login, register, storeReferer } from '$lib/auth';

import loginSchema from '$src/schemas/login'
import registerSchema from '$src/schemas/register'

const styles = theme => ({
  buttonIcon: tw`text-xl mr-2`,
  link: {
    ...tw`no-underline`,
    color: theme.palette.secondary.main
  }
})

const LoginBox = ({ open, onClose, classes, width }) => {
  const [mode, setMode] = useState('login')
  const otherMode = mode === 'login' ? 'register' : 'login'

  function toggleMode () {
    setMode(otherMode)
  }

  useEffect(() => {
    if (open) {
      storeReferer(location.pathname + location.search)
      setMode('login')
    }
  }, [open])


  function onSubmit ({ email, password }, { setSubmitting, setErrors }) {
    if (mode === 'login') {
      login(email, password)
        .then(() => {
          onClose()
        })
        .catch(err => {
          [401, 403].includes(err.response.status) && setErrors({
            email: 'invalid email / password',
            password: 'invalid email / password',
          })
        })
        .finally(() => setSubmitting(false))
    } else if (mode === 'register') {
      register(email, password)
        .then(() => {
          onClose()
          navigate(PREFIX + '/welcome/unconfirmed')
        })
        .finally(() => setSubmitting(false))
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullScreen={isWidthDown('sm', width)}>
      <DialogTitle>
        {mode === 'login' ? 'Login' : 'Register'}
      </DialogTitle>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={mode === 'login' ? loginSchema : registerSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <FormikTextField
                    name='email'
                    label={mode === 'login' ? 'Email or Username' : 'Email'}
                    placeholder='Email address'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name='password'
                    type='password'
                    label='Password'
                    placeholder='Enter password'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                {mode === 'login' && (
                  <Grid item xs={12} container justify='flex-end'>
                    <Link to='/forgot-password' className={classes.link} onClick={onClose}>Forgot password?</Link>
                  </Grid>
                )}
                {mode === 'register' && (
                  <Grid item xs={12}>
                    <FormikTextField
                      name='passwordConfirm'
                      type='password'
                      label='Password confirm'
                      placeholder='Confirm password'
                      fullWidth
                      margin='normal'
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} style={tw`mt-6`}>
                  <Typography variant='button'>Or login with</Typography>
                </Grid>
                <Grid item xs={12} md>
                  <Button
                    variant='contained'
                    color='secondary'
                    href={API_HOST + '/auth/facebook'}
                    fullWidth={isWidthDown('sm', width)}
                  >
                    <FontAwesomeIcon icon={faFacebook} className={classes.buttonIcon} />
                    Facebook
                  </Button>
                </Grid>
                <Grid item xs={12} md>
                  <Button
                    variant='contained'
                    color='secondary'
                    href={API_HOST + '/auth/google'}
                    fullWidth={isWidthDown('sm', width)}
                  >
                    <FontAwesomeIcon icon={faGoogle} className={classes.buttonIcon} />
                    Google
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color='primary' onClick={onClose}>Cancel</Button>
              <Button color='primary' onClick={toggleMode}>
                {mode === 'login' ? 'Register' : 'Login'}
              </Button>
              <Button variant='contained' color='primary' type='submit' disabled={isSubmitting}>
                {mode}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

LoginBox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
}

export default withStyles(styles)(withWidth()(LoginBox))