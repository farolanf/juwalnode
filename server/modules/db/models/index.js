const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true })

const dir = path.resolve(__dirname)
const files = fs.readdirSync(dir, 'utf8')

files.forEach(file => {
  if (__filename.endsWith(`/${file}`)) return

  const filePath = path.resolve(dir, file)
  let desc = require(filePath)
  if (typeof desc === 'function') {
    desc = desc({ 
      Types: mongoose.Schema.Types, 
      ObjectId: mongoose.Schema.Types.ObjectId 
    })
  }
  const name = desc.name || file.substring(0, file.lastIndexOf('.'))
  const schema = new mongoose.Schema(desc.fields, desc.options)
  const model = mongoose.model(name, schema)
  exports[name] = model
})