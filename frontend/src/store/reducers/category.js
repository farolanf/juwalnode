import { handleFetchAction } from '$src/lib/action'
import { fetchCategories } from '$act/category'

export default handleFetchAction(fetchCategories)