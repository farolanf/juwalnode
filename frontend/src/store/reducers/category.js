import { fetchActionReducer } from '$src/lib/action'
import { fetchCategories } from '$act/category'

export default fetchActionReducer(fetchCategories)