import React from 'react'
import { API_HOST } from '$src/const'

// eslint-disable-next-line
const ImageField = ({ source, record = {}, sortable, basePath, ...props }) => (
  <img src={API_HOST + `/${record[source]}`} {...props} />
)

export default ImageField