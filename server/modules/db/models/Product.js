module.exports = ({ ObjectId }) => ({
  fields: {
    name: { type: String, maxlength: 100, required: true },
    description: { type: String, maxlength: 1000, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    image: { type: String, maxlength: 150 },
    image2: { type: String, maxlength: 150 },
    thumbnail: { type: String, maxlength: 150 },
    display: Number,
    attrs: [{ type: ObjectId, ref: 'AttributeValue' }],
    categories: [{ type: ObjectId, ref: 'Category' }],
  }, 
  options: {
    timestamps: true,
  }
})