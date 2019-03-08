const cmd = require('./server/lib/cmd')

global.app = require('./server/app')

if (process.argv.length < 3) {
  cmd.print()
  process.exit()
} else {
  const fullName = process.argv[2]
  cmd.run(fullName)
    .catch(console.log)
    .finally(() => process.exit())
}
