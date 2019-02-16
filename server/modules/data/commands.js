/* eslint-disable no-console */
const path = require('path')
const { exec } = require('child_process')
const prompts = require('prompts')

const db = require('../../sequelize')
const cmd = require('../../lib/cmd')

const env = process.env.NODE_ENV || 'development'
const sqlConfig = require('../../sequelize/config/config.json')[env]

cmd.add('data', 'initdb', 'Initialize database', initDb)
cmd.add('data', 'create-admin', 'Create admin user', createAdmin)
cmd.add('data', 'routes', 'Create admin user', dumpRoutes)

function initDb(program, argv) {
  program.parse(argv)
  const prjPath = path.resolve(__dirname, '../../../')
  importSql(path.resolve(prjPath, 'challenge-files/database/tshirtshop.sql'))
}

function importSql(sqlPath) {
  const { username, password, database } = sqlConfig
  const cmd = `cat ${sqlPath} | mysql -u${username} -p${password} ${database}`
  exec(cmd, (err, stdout, stderr) => {
    console.log(stdout, stderr)
  })
}

async function createAdmin(program, argv) {
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

  db.User
    .create({ email, username, password: inputs.password })
    .finally(() => db.sequelize.close())
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