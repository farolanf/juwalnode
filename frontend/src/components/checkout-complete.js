import React, { useEffect } from 'react'

const CheckoutComplete = ({ fetchCart }) => {
  useEffect(() => {
    fetchCart()
  }, [])
  return (
    <div>Thank you. Your order will be processed and your order summary will be emailed to you shortly.</div>
  )
}

export default CheckoutComplete