import { handleFetchAction } from '$src/lib/action'
import { fetchCart, setCartItemQuantity } from '$act/cart'

export default handleFetchAction(fetchCart, {
  [setCartItemQuantity]: (state, { payload: { i, val } }) => ({
    ...state,
    data: state.data.map((item, j) => {
      if (j === i) {
        return {
          ...item,
          quantity: val,
          _dirty: true
        }
      }
      return item
    })
  })
})