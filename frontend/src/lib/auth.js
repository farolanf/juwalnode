import axios from 'axios'
import { navigate } from '@reach/router'

import { API_BASE } from '$src/const'

export const saveToken = token => {
  localStorage.setItem('token', token)
  initAuthorization()
}

export const clearToken = () => {
  localStorage.removeItem('token')
  initAuthorization()
}

export const loadToken = () => localStorage.getItem('token')

export const storeReferer = () => {
  const url = window.location.pathname + window.location.search
  localStorage.setItem('referer', url)
}

export const loadReferer = () => localStorage.getItem('referer')

export const register = (email, password) => {
  return axios
    .post(API_BASE + '/auth/register', {
      email,
      password,
    })
    .then(res => {
      saveToken(res.data.token)
      return res
    })
}

export const login = (username, password) => {
  return axios
    .post(API_BASE + '/auth/local', {
      username,
      password,
    })
    .then(res => {
      saveToken(res.data.token)
      return res
    })
}

export const verify = () => {
  initAuthorization()
  return axios.get(API_BASE + '/auth/verify')
    .then(res => {
      saveToken(res.data.token)
      return res
    })
    .catch(err => {
      clearToken()
      throw err
    })
}

export const loginRedirect = () => {
  const referer = loadReferer()
  navigate(referer && referer !== '/' ? referer : process.env.GATSBY_HOME)
}

export const uniqueEmail = email => {
  return axios.get(API_BASE + '/auth/unique-email', { params: { email } })
    .then(response => response.data.unique)
}

export const initAuthorization = () => {
  const token = loadToken()
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}