import { handleFetchAction } from '$src/lib/action'
import { fetchDepartments } from '$act/department'

export default handleFetchAction(fetchDepartments)