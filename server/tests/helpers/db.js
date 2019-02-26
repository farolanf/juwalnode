exports.destroy = async (...models) => {
  models = Array.isArray(models) ? models : [models]
  // execute in series to avoid deadlocks
  return models.reduce((promise, model) => {
    return promise.then(() => model.destroy({ where: {}, logging: false }))
  }, Promise.resolve())
}