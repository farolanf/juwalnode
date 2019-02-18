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
import pluralize from 'pluralize'
import queryString from 'query-string'

const convertId = d => {
  const pk = Object.keys(d).find(key => key.endsWith('_id'))
  d.id = d[pk]
  return d
}

const ifPk = (field, resource) => {
  return field !== 'id'
    ? field
    : pluralize.singular(resource).toLowerCase() + '_id'
}

// eslint-disable-next-line
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
    case UPDATE_MANY:
    case DELETE_MANY:
      return { data: response } // response is a list of ids
    case GET_MANY:
      // response is a list of records
      data = response.map(convertId)
      return { data }
    case GET_MANY_REFERENCE:
      throw new Error('Not implemented')
  }
}

export default (type, resource, params) => {
  console.log(type, resource, params)
  const listUrl = `${API_BASE}/${resource}`
  const detailUrl = `${API_BASE}/${resource}/${params.id}`
  let method, url, query, data
  switch (type) {
    case GET_LIST:
      method = 'get'
      url = listUrl
      query = {
        sort: (params.sort.order === 'ASC' ? '-' : '') + ifPk(params.sort.field, resource),
        count: params.pagination.perPage
      }
      if (params.pagination.page - 1) {
        query.page = params.pagination.page - 1
      }
      url += `?${queryString.stringify(query)}`
      break
    case GET_ONE:
      method = 'get'
      url = detailUrl
      break
    case CREATE:
      method = 'post'
      url = listUrl
      data = params.data
      break
    case UPDATE:
      method = 'put'
      url = detailUrl
      data = params.data
      delete data.id
      break
    case UPDATE_MANY:
      return Promise.all(
        params.ids.map(id => {
          const detailUrl = `${API_BASE}/${resource}/${id}`
          return axios.put(detailUrl).then(() => id)
        })
      ).then(ids => convertResponse(ids, type, resource, params))
    case DELETE:
      method = 'delete'
      url = detailUrl
      break
    case DELETE_MANY:
      return Promise.all(
        params.ids.map(id => {
          const detailUrl = `${API_BASE}/${resource}/${id}`
          return axios.delete(detailUrl).then(() => id)
        })
      ).then(ids => convertResponse(ids, type, resource, params))
    case GET_MANY:
      return Promise.all(
        params.ids.map(id => {
          const detailUrl = `${API_BASE}/${resource}/${id}`
          return axios.get(detailUrl).then(response => response.data)
        })
      ).then(records => convertResponse(records, type, resource, params))
    case GET_MANY_REFERENCE:
      throw new Error('Not implemented')
    }
  return axios[method](url, data)
    .then(response => convertResponse(response, type, resource, params))
}