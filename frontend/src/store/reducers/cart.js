import { handleFetchAction } from '$src/lib/action'
import { fetchCart } from '$act/cart'

export default handleFetchAction(fetchCart)