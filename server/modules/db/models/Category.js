module.exports = ({ ObjectId }) => ({
  fields: {
    department: { type: ObjectId, ref: 'Department' },
    name: { type: String, maxlength: 100, required: true },
    description: { type: String, maxlength: 1000 },
  }
})