const db = require('../../sequelize')
const cmd = require('../../lib/cmd')

const models = Object.keys(db)
  .filter(name => name.toLowerCase() !== 'sequelize')
  .map(name => db[name])

exports.destroy = async (...models) => {
  models = Array.isArray(models) ? models : [models]
  // execute in series to avoid deadlocks
  return models.reduce((promise, model) => {
    return promise.then(() => {
      return model.destroy({ where: {}, logging: false })
    })
  }, Promise.resolve())
}

exports.populate = function populate () {
  return cmd._run('data', 'populate', ['node', 'cmd'])
}

exports.truncate = function truncate () {
  return exports.destroy(...models)
}

exports.reset = async function reset () {
  await exports.truncate()
  await exports.populate()
}