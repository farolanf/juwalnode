const { User } = require('../../sequelize')

describe('User model', () => {
  it('Store password hash', () => {
    const pw = 'mypassword1234'
    const user = new User()
    user.password = pw
    assert.notEqual(user.password, pw)
  })
  it('Verify password', () => {
    const pw = 'mypassword1234'
    const user = new User()
    user.password = pw
    assert.isOk(user.verifyPassword(pw))
  })
})