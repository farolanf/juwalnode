module.exports = ({ ObjectId }) => ({
  fields: {
    attribute: { type: ObjectId, ref: 'Attribute' },
    value: { type: String, maxlength: 100, required: true },
  }
})