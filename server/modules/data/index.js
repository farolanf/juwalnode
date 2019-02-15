/* eslint-disable no-console */
const path = require('path')
const { exec } = require('child_process')
const cmd = require('../../lib/cmd')
const config = require('../../config')

cmd.add('data', 'initdb', 'Initialize database', initDb)

function initDb(program, argv) {
  program.parse(argv)
  const prjPath = path.resolve(__dirname, '../../../')
  const dbPath = path.resolve(prjPath, 'challenge-files/database/tshirtshop.sql')
  const { user, password, dbName } = config.mysql
  const cmd = `cat ${dbPath} | mysql -u${user} -p${password} ${dbName}`
  exec(cmd, (err, stdout, stderr) => {
    console.log(stdout, stderr)
  })
}

