exports.addIncludes = async function addIncludes (paths, value, context, db) {
  if (!paths.length || !paths[0]) return

  paths = paths.slice()

  const model = getModel(db, paths.shift())
  const include = { model }

  if (paths.length && paths[0] && await hasField(model, paths[0])) {
    include.where = { [paths[0]]: value }
    paths.shift()
  }

  await addIncludes(paths, value, include, db)

  context.include = context.include || []
  context.include.push(include)
}

function getModel (db, name) {
  name = Object.keys(db)
    .filter(key => key.toLowerCase() !== 'sequelize')
    .find(key => key.toLowerCase() === name.toLowerCase())
  return db[name]
}

function hasField (model, name) {
  return model.describe(null, { logging: false }).then(schema => !!schema[name])
}