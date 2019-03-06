const path = require('path')
const fs = require('fs')
const util = require('util')
const nodemailer = require('nodemailer')
const mustache = require('mustache')
const config = require('../config')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

exports.sendMail = async function sendMail (options, template, context) {
  const ext = '.html'
  const extTxt = '.txt'
  options = { ...options }
  if (template) {
    const templates = {
      html: template + ext,
      text: template + extTxt,
    }
    await Object.keys(templates).reduce((promise, type) => promise.then(async () => {
      const template = templates[type]
      const templatePath = path.resolve(config.templatesDir, template)
      const fileOk = await util.promisify(fs.access)(templatePath, fs.constants.F_OK | fs.constants.R_OK)
        .then(() => true)  
        .catch(() => false)
      if (fileOk) {
        const templateContent = await util.promisify(fs.readFile)(templatePath, 'utf8')
        options[type] = mustache.render(templateContent, context)
      }
    }), Promise.resolve())
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