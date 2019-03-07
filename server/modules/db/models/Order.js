module.exports = ({ ObjectId }) => ({
  fields: {
    total: { type: Number, required: true },
    reference: { type: String, maxlength: 100 },
    customer: { type: ObjectId, ref: 'Customer' },
    shipping: { type: ObjectId, ref: 'Shipping' },
  },
  options: {
    timestamps: true,
  }
})