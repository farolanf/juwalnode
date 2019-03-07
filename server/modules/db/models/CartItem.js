module.exports = ({ ObjectId }) => ({
  fields: {
    cartId: { type: String, maxlength: 32, required: true },
    product: { type: ObjectId, ref: 'Product' },
    attrs: { type: String, maxlength: 1000, required: true },
    quantity: { type: Number, required: true },
  }
})
