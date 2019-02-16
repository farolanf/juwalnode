/* eslint-disable no-console */
const path = require('path')
const { exec } = require('child_process')
const prompts = require('prompts')

const db = require('../../sequelize')
const cmd = require('../../lib/cmd')
const config = require('../../config')

cmd.add('data', 'initdb', 'Initialize database', initDb)
cmd.add('data', 'create-admin', 'Create admin user', createAdmin)

function initDb(program, argv) {
  program.parse(argv)
  const prjPath = path.resolve(__dirname, '../../../')
  importSql(path.resolve(prjPath, 'challenge-files/database/tshirtshop.sql'))
}

function importSql(sqlpath) {
  const { user, password, dbName } = config.data.mysql
  const cmd = `cat ${sqlpath} | mysql -u${user} -p${password} ${dbName}`
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

  return db.User.create({ email, username, password: inputs.password })
}