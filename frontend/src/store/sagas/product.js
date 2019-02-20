import axios from 'axios'
import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts } from '$act/product'

function fetchApi ({ payload: { department, category, page }}) {
  return axios.get(API_BASE + '/products', {
    params: {
      count: 15,
      page
    }
  })
}

export default fetchActionSaga(fetchProducts, fetchApi)