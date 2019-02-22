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
    await User.truncate({ logging: false })
    await UserGroup.truncate({ logging: false })
  })

  it('register', () => {
    return register(email, password)
      .then(response => {
        assert.property(response.body, 'token')
        assert.property(response.body, 'user')
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
})