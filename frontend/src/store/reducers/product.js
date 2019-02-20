import { handleFetchAction } from '$src/lib/action'
import { fetchProducts } from '$act/product'

export default handleFetchAction(fetchProducts)