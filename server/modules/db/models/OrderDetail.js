module.exports = ({ ObjectId }) => ({
  fields: {
    order: { type: ObjectId, ref: 'Order', required: true },
    cartItem: { type: ObjectId, ref: 'CartItem', required: true },
    product: { type: ObjectId, ref: 'Product', required: true },
    attrs: { type: String, maxlength: 1000, required: true },
    productName: { type: String, maxlength: 100, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  options: {
    timestamps: true,
  }
})