import axios from 'axios'
import { API_BASE } from '$src/const'
import { fetchActionSaga } from '$src/lib/action'
import { fetchDepartments } from '$act/department'

function fetchApi () {
  return axios.get(API_BASE + '/departments')
}

export default fetchActionSaga(fetchDepartments, fetchApi)