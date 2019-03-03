import { fetchActionReducer } from '$src/lib/action'
import { fetchDepartments } from '$act/department'

export default fetchActionReducer(fetchDepartments)