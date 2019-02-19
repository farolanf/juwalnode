import React from 'react'
import { API_HOST } from '$src/const'

// eslint-disable-next-line
const ImageField = ({ source, record = {}, style }) => (
  <img src={API_HOST + `/${record[source]}`} style={style} />
)

export default ImageField