const cmd = require('./server/lib/cmd')

require('./server/app')

if (process.argv.length < 3) {
  cmd.print()
} else {
  const fullName = process.argv[2]
  cmd.run(fullName)
}
