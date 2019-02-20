exports.addIncludes = async function addIncludes (paths, value, context, db) {
  if (paths.length <= 1) return

  const model = getModel(db, paths[0])
  const include = { model }

  if (await hasField(model, paths[1])) {
    include.where = { [paths[1]]: value }
    paths = paths.slice(2)
  } else {
    paths = paths.slice(1)
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