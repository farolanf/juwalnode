const cmd = require('../../lib/cmd')

cmd.add('data', 'initdb', 'Initialize database', initDb)

function initDb(program, argv) {
  program.parse(argv)

}

