import axios from 'axios'
import { navigate } from '@reach/router'
import { setUser as _setUser } from '$act/user'
import { API_BASE, PREFIX } from '$src/const'
import store from '$src/store'

const setUser = user => {
  store.dispatch(_setUser({ user }))
}

export const saveToken = token => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('token', token)
  initAuthorization()
}

const clearToken = () => {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem('token')
  initAuthorization()
}

const loadToken = () => {
  if (typeof localStorage === 'undefined') return
  return localStorage.getItem('token')
}

export const storeReferer = () => {
  if (typeof localStorage === 'undefined') return
  const url = window.location.pathname + window.location.search
  localStorage.setItem('referer', url)
}

const loadReferer = () => {
  if (typeof localStorage === 'undefined') return
  return localStorage.getItem('referer')
}

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
  navigate(PREFIX)
}

export const verify = () => {
  if (!loadToken()) return Promise.resolve()
  initAuthorization()
  return axios.get(API_BASE + '/auth/verify')
    .then(res => {
      saveToken(res.data.token)
      setUser(res.data.user)
      return res
    })
    .catch(() => {
      clearToken()
    })
}

export const loginRedirect = () => {
  const referer = loadReferer()
  navigate(referer && referer !== PREFIX ? referer : PREFIX + process.env.GATSBY_HOME)
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