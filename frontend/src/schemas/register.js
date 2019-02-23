import * as Yup from 'yup'
import _ from 'lodash'
import { uniqueEmail } from '$lib/auth';

const uniqueEmailDebounced = _.debounce(uniqueEmail, 350)

export default Yup.object().shape({
  email: Yup.string().email().required()
    .test('email unique', 'email is taken', uniqueEmailDebounced),
  password: Yup.string().min(5).max(100),
  passwordConfirm: Yup.string()
    .test('password equal', 'must equal to password', function (value) {
      return value === this.parent.password
    }),
})
