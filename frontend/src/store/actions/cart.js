import { createAsyncAction } from '$src/lib/action'

export const fetchCart = createAsyncAction('FETCH_CART')
export const addCartItem = createAsyncAction('ADD_CART_ITEM')
export const updateCartItem = createAsyncAction('UPDATE_CART_ITEM')
export const deleteCartItem = createAsyncAction('DELETE_CART_ITEM')
export const setCartItemQuantity = createAsyncAction('SET_CART_ITEM_QUANTITY')