/* eslint-disable no-console */
const prompts = require('prompts')

const env = process.env.NODE_ENV || 'development'
const sqlConfig = require('../../sequelize/config/config.json')[env]

const cmd = require('../../lib/cmd')
cmd.add('data', 'populate', 'Populate database', populateDb)
cmd.add('data', 'create-admin', 'Create admin user', createAdmin)
cmd.add('data', 'routes', 'Create admin user', dumpRoutes)

async function populateDb(program, argv) {
  const { mongoose, models } = require('../../db')
  const Seeder = require('mongoose-data-seeder')
  const data = require('./seeds/data')

  program.parse(argv)

  return new Promise(resolve => {
    mongoose.connection.on('open', () => {
      const seeder = new Seeder({ dropCollection: true })
      resolve(seeder.load(data))
    })
  })
}

async function createAdmin(program, argv) {
  const db = require('../../sequelize')

  program
    .usage('<username> <email>')
    .parse(argv)

  const [username, email] = program.args

  if (!username || !email) {
    return program.outputHelp()
  }

  const inputs = await prompts([
    {
      type: 'password',
      name: 'password',
      message: 'Password'
    }
  ])

  await db.User
    .create({ email, username, password: inputs.password })
    .then(user => {
      return db.UserGroup.create({ user_id: user.user_id, group: 'admin' })
    })
}

function dumpRoutes(program, argv) {
  program.parse(argv)
  dump(global.app._router.stack)

  function dump(stack) {
    stack && stack.forEach(layer => {
      if (!layer.route) return
      const methods = Object.keys(layer.route.methods)
      console.log(methods.join(',').padEnd(7).toUpperCase(), layer.route.path)
      dump(layer.route.stack)
    })
  }
}