import _ from 'lodash'
import { createSelector } from 'reselect'

export const itemsSelector = state => state.cart.data || []

export const shippingCostSelector = state => _.get(state, 'cart.shipping.cost', 0)

export const subTotalSelector = createSelector(
  itemsSelector,
  items => items.reduce((acc, item) => {
    return acc + (item.Product.price * item.quantity)
  }, 0)
)

export const totalSelector = createSelector(
  subTotalSelector,
  shippingCostSelector,
  (subTotal, shippingCost) => subTotal + shippingCost
)

export const dirtySelector = createSelector(
  itemsSelector,
  items => !!items.find(item => item._dirty)
)
