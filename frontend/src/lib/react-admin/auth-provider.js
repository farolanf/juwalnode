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
  } else if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token')
  } else if (type === AUTH_CHECK) {
    const token = localStorage.getItem('token')
    return axios.get(API_BASE + '/auth/verify', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).catch(err => {
      localStorage.removeItem('token')
      throw err
    })
  } else if (type === AUTH_ERROR) {
    localStorage.removeItem('token')
  }
}

export default authProvider