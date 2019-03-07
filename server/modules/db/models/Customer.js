module.exports = ({ ObjectId }) => ({
  fields: {
    creditCard: { type: String, maxlength: 100 },
    address1: { type: String, maxlength: 100 },
    address2: { type: String, maxlength: 100 },
    city: { type: String, maxlength: 100 },
    region: { type: String, maxlength: 100 },
    postalCode: { type: String, maxlength: 100 },
    country: { type: String, maxlength: 100 },
    phone: { type: String, maxlength: 100 },
    shippingRegion: { type: ObjectId, ref: 'ShippingRegion' },
    cartId: { type: String, maxlength: 32 },
  },
  options: {
    timestamps: true,
  }
})