import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK
} from 'react-admin'
import axios from 'axios'
import { API_BASE } from '$src/const'

const authProvider = async (type, params) => {
  if (type === AUTH_LOGIN) {
    const response = await axios.post(API_BASE + '/auth/local', {
      username: params.username,
      password: params.password
    }).catch(err => {
      if (err.response.status === 401) {
        throw new Error('Invalid username/password')
      }
      throw err
    })
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.Authorization = 'Bearer ' + response.data.token
  } else if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token')
    delete axios.defaults.headers.Authorization
  } else if (type === AUTH_CHECK) {
    const token = localStorage.getItem('token')
    await axios.get(API_BASE + '/auth/verify', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).catch(err => {
      localStorage.removeItem('token')
      delete axios.defaults.headers.Authorization
      throw err
    })
    axios.defaults.headers.Authorization = 'Bearer ' + token
  } else if (type === AUTH_ERROR) {
    if (params.status === 401) {
      localStorage.removeItem('token')
    }
  }
}

export default authProvider