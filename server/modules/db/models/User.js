module.exports = ({ ObjectId }) => ({
  fields: {
    email: { type: String, maxlength: 100, required: true },
    username: { type: String, maxlength: 100, required: true },
    password: { type: String, maxlength: 100, required: true },
    groups: [{ type: ObjectId, ref: 'UserGroup' }],
    customer: { type: ObjectId, ref: 'Customer' },
    facebookId: { type: String, maxlength: 100 },
    googleId: { type: String, maxlength: 100 },
  },
  options: {
    timestamps: true,
  }
})