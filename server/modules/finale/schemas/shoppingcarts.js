const Yup = require('yup')

module.exports = {
  create: Yup.object().shape({
    product_id: Yup.number().required(),
    attrs: Yup.array().of(Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.mixed().required()
    })),
    quantity: Yup.number().required(),
  })
}