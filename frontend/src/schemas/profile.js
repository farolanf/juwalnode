import * as Yup from 'yup'

export default  Yup.object().shape({
  credit_card: Yup.string().max(100).nullable(true),
  address_1: Yup.string().max(100).nullable(true),
  address_2: Yup.string().max(100).nullable(true),
  city: Yup.string().max(100).nullable(true),
  region: Yup.string().max(100).nullable(true),
  postal_code: Yup.string().max(100).nullable(true),
  country: Yup.string().max(100).nullable(true),
  shipping_region_id: Yup.number(),
  day_phone: Yup.string().max(100).nullable(true),
  eve_phone: Yup.string().max(100).nullable(true),
  mob_phone: Yup.string().max(100).nullable(true),
})