import axios from 'axios'
import { API_BASE } from '$src/const'

export const register = (email, password) => {
  return axios.post(API_BASE + '/auth/register', { email, password })
    .then(response => {
      saveToken(response.data.token)
    })
}

export const login = (username, password) => {
  return axios.post(API_BASE + '/auth/local', { username, password })
    .then(response => {
      saveToken(response.data.token)
    })
}

export const verify = () => {
  return axios.get(API_BASE + '/auth/verify')
    .then(response => {
      saveToken(response.data.token)
    })
}

export const saveToken = token => {
  localStorage.setItem('token', token)
}

export const clearToken = () => {
  localStorage.removeItem('token')
}