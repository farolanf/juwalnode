import axios from 'axios'
import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchProducts } from '$act/product'

function fetchApi ({ payload: { department, category, page }}) {
  const params = { count: 15, page }
  if (category) {
    params.category__name = category
  } else if (department) {
    params.category__department__name = department
  }
  return axios.get(API_BASE + '/products', { params })
}

export default fetchActionSaga(fetchProducts, fetchApi)