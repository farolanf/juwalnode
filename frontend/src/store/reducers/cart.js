import { fetchActionReducer } from '$src/lib/action'
import { 
  fetchCart, 
  setCartItemQuantity,
  updateCartItem,
  deleteCartItem,
  setShipping,
} from '$act/cart'

export default fetchActionReducer(fetchCart, {
  [setCartItemQuantity]: (state, { payload: { id, quantity } }) => ({
    ...state,
    data: state.data.map(item => {
      if (item.item_id === id) {
        return {
          ...item,
          quantity,
          _dirty: true
        }
      }
      return item
    })
  }),
  [updateCartItem.success]: (state, { payload: { data } }) => ({
    ...state,
    data: state.data.map(item => {
      if (item.item_id === data.item_id) {
        return { ...data }
      }
      return item
    })
  }),
  [deleteCartItem]: (state, { payload: { item } }) => ({
    ...state,
    data: state.data.filter(it => it.item_id !== item.item_id)
  }),
  [setShipping]: (state, { payload: { shipping } }) => ({
    ...state,
    shipping
  })
})