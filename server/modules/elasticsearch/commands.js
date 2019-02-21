const cmd = require('../../lib/cmd')
const config = require('../../config')
const client = require('./client')
const db = require('../../sequelize')
const init = require('./init')

cmd.add('es', 'rebuild', 'Rebuild index', rebuildIndex)

async function rebuildIndex (program, argv) {
  program.parse(argv)

  await client.indices.delete({
      index: config.elasticsearch.index,
      ignoreUnavailable: true
    })
    .then(() => console.log('index deleted'))

  await init().then(() => console.log('index created'))

  db.sequelize.close()
}