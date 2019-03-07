module.exports = ({ ObjectId }) => ({
  fields: {
    name: { type: String, maxlength: 100, required: true },
    cost: { type: Number, required: true },
    shippingRegion: { type: ObjectId, ref: 'ShippingRegion' },
  }
})