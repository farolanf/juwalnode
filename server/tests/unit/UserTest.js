const { User, sequelize } = require('../../sequelize')

const email = 'user@foo.com'
const username = 'user1'
const password = 'mypassword1234'

describe('User model', () => {

  beforeEach(async () => {
    await sequelize.truncate({ logging: false })
  })

  it('Store password hash', () => {
    const user = new User()
    user.password = password
    assert.notEqual(user.password, password)
  })
  it('Verify password', () => {
    const user = new User()
    user.password = password
    assert.isTrue(user.verifyPassword(password))
  })
  it('Exclude password', async () => {
    const user = await User.create({ email, username, password })
    const data = await User.findOne({ user_id: user.user_id })
    assert.isUndefined(data.password)
  })
})