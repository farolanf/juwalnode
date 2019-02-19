import axios from 'axios'
import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchCategories } from '$act/category'

function fetchApi () {
  return axios.get(API_BASE + '/categories')
}

export default fetchActionSaga(fetchCategories, fetchApi)