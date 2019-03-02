import { createFetchAction } from '$src/lib/action'

export const fetchProducts = createFetchAction('FETCH_PRODUCTS')
export const fetchProduct = createFetchAction('FETCH_PRODUCT')