import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup.string().required(), // email or username
  password: Yup.string().min(5).max(100),
})