import axios from 'axios'
import { API_BASE } from '$src/const'
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  GET_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin'

const convertId = d => {
  const pk = Object.keys(d).find(key => key.endsWith('_id'))
  d.id = d[pk]
  return d
}

const restoreId = d => {
  const pk = Object.keys(d).find(key => key.endsWith('_id'))
  d[pk] = d.id
  delete d.id
  return d
}

function convertResponse (response, type, resource, params) {
  let data, total
  switch (type) {
    case GET_LIST:
      total = +response.headers['content-range'].match(/(\d+)$/)[1]
      data = response.data.map(convertId)
      return { data, total }
    case GET_ONE:
    case CREATE:
    case UPDATE:
    case DELETE:
      return { data: convertId(response.data) }
    case GET_MANY:
      data = response.data.map(convertId)
      return { data }
  }
}

export default (type, resource, params) => {
  const listUrl = `${API_BASE}/${resource}`
  const detailUrl = `${API_BASE}/${resource}/${params.id}`
  let method, url, options
  switch (type) {
    case GET_LIST:
      method = 'get'
      url = listUrl
      break
    case GET_ONE:
      method = 'get'
      url = detailUrl
      break
    case CREATE:
      method = 'post'
      url = listUrl
      break
  }
  return axios[method](url, options)
    .then(response => convertResponse(response, type, resource, params))
}