const path = require('path')
const fs = require('fs')
const util = require('util')
const nodemailer = require('nodemailer')
const mustache = require('mustache')
const config = require('../config')

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure: false,
})

// TODO: test
exports.sendMail = async function sendMail (options, template, context) {
  options = { ...options }
  if (template) {
    const templatePath = path.resolve(config.templatesDir, template)
    const templateContent = await util.promisify(fs.readFile)(templatePath, 'utf8')
    options.html = mustache.render(templateContent, context)
  }
  await transporter.sendMail(options)
}

exports.testMail = async function testMail () {
  await transporter.sendMail({
    from: '"Nodemailer test" noreply@foo.com',
    to: 'someone@juwal.id',
    subject: 'Email test',
    text: 'Text content',
    html: 'Html <b>content</b>',
  })
}