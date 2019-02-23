import axios from 'axios'
import { navigate } from '@reach/router'
import { setUser as _setUser } from '$act/auth'
import { API_BASE } from '$src/const'
import store from '$src/store'

const setUser = user => {
  store.dispatch(_setUser({ user }))
}

const saveToken = token => {
  localStorage.setItem('token', token)
  initAuthorization()
}

const clearToken = () => {
  localStorage.removeItem('token')
  initAuthorization()
}

const loadToken = () => localStorage.getItem('token')

export const storeReferer = () => {
  const url = window.location.pathname + window.location.search
  localStorage.setItem('referer', url)
}

const loadReferer = () => localStorage.getItem('referer')

export const register = (email, password) => {
  return axios
    .post(API_BASE + '/auth/register', {
      email,
      password,
    })
    .then(res => {
      saveToken(res.data.token)
      setUser(res.data.user)
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
      setUser(res.data.user)
      loginRedirect()
      return res
    })
}

export const logout = () => {
  clearToken()
  setUser(null)
  navigate('/')
}

export const verify = () => {
  initAuthorization()
  return axios.get(API_BASE + '/auth/verify')
    .then(res => {
      saveToken(res.data.token)
      setUser(res.data.user)
      return res
    })
    .catch(err => {
      clearToken()
      throw err
    })
}

const loginRedirect = () => {
  const referer = loadReferer()
  navigate(referer && referer !== '/' ? referer : process.env.GATSBY_HOME)
}

export const uniqueEmail = email => {
  return axios.get(API_BASE + '/auth/unique-email', { params: { email } })
    .then(response => response.data.unique)
}

const initAuthorization = () => {
  const token = loadToken()
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}