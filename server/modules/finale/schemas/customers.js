const Yup = require('yup')

module.exports = {
  update: Yup.object().shape({
    credit_card: Yup.string().max(100),
    address_1: Yup.string().max(100),
    address_2: Yup.string().max(100),
    city: Yup.string().max(100),
    region: Yup.string().max(100),
    postal_code: Yup.string().max(100),
    country: Yup.string().max(100),
    shipping_region_id: Yup.number(),
    day_phone: Yup.string().max(100),
    eve_phone: Yup.string().max(100),
    mob_phone: Yup.string().max(100),
  })
}