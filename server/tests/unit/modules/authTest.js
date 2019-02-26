const { app: { apiBase } } = require('../../../config')
const app = require('../../../app')
const { User, UserGroup } = require('../../../sequelize')

const email = 'user@foo.com'
const password = 'hellopw123'

describe('auth', () => {

  function register (email, password) {
    return request(app)
      .post(apiBase + '/auth/register')
      .send({ email, password })
  }

  beforeEach(async () => {
    await User.destroy({ where: {}, logging: false })
    await UserGroup.destroy({ where: {}, logging: false })
  })

  it('register', () => {
    return register(email, password)
      .then(response => {
        assert.property(response.body, 'token')
        assert.property(response.body, 'user')
      })
  })

  it('validate register params', () => {
    return register('not-an-email', password)
      .then(response => {
        assert.equal(response.status, 400)
      })
  })

  it('auth - local', async () => {
    await register(email, password)
    await request(app)
      .post(apiBase + '/auth/local')
      .send({ username: email, password })
      .then(response => {
        assert.property(response.body, 'token')
        assert.property(response.body, 'user')
      })
  })

  it('verify', async () => {
    const data = await register(email, password)
      .then(response => response.body)
    await request(app)
      .get(apiBase + '/auth/verify')
      .set('Authorization', 'Bearer ' + data.token)
      .then(response => {
        assert.property(response.body, 'token')
        assert.property(response.body, 'user')
      })
  })

  it('cannot access protected route: /_tests', () => {
    return request(app)
      .get(apiBase + '/_tests')
      .then(response => {
        assert.equal(response.status, 403)
      })
  })

  it('access protected route: /_tests', async () => {
    const data = await register(email, password)
      .then(response => response.body)
    await request(app)
      .get(apiBase + '/_tests')
      .set('Authorization', 'Bearer ' + data.token)
      .then(response => {
        assert.equal(response.status, 200)
      })
  })

  it('omit password', () => {
    return register(email, password)
      .then(response => {
        assert.property(response.body, 'token')
        assert.property(response.body, 'user')
        assert.notProperty(response.body.user, 'password')
      })
  })

  it('check unique email - true', () => {
    return request(app)
      .get(apiBase + '/auth/unique-email')
      .query({ email })
      .then(response => {
        assert.equal(response.status, 200)
        assert.property(response.body, 'unique')
        assert.equal(response.body.unique, true)
      })
  })

  it('check unique email - false', async () => {
    await register(email, password)
    return request(app)
      .get(apiBase + '/auth/unique-email')
      .query({ email })
      .then(response => {
        assert.equal(response.status, 200)
        assert.property(response.body, 'unique')
        assert.equal(response.body.unique, false)
      })
  })
})