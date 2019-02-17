import axios from 'axios'
import { API_BASE } from '$src/const'
import {
  GET_LIST,
} from 'react-admin'

function convertResponse (response, type, resource, params) {
  let data, total, pkey
  switch (type) {
    case GET_LIST:
      total = response.headers['content-range'].match(/(\d+)$/)[1]
      data = response.data.map(d => {
        if (!pkey) {
          pkey = Object.keys(d).find(key => key.endsWith('_id'))
        }
        d.id = d[pkey]
        return d
      })
      return { data, total }
  }
}

export default (type, resource, params) => {
  let method, url, options
  switch (type) {
    case GET_LIST:
      method = 'get'
      url = `${API_BASE}/${resource}`
      break
  }
  return axios[method](url, options)
    .then(response => convertResponse(response, type, resource, params))
}