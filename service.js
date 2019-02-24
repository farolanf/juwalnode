const path = require('path')
const Service = require('node-linux').Service

const service = new Service({
  name: 'turingfullstack',
  description: 'Turing fullstack challenge',
  script: path.resolve(__dirname, './server/index.js'),
  env: [
    { name: 'NODE_ENV', value: 'production' }
  ]
})

service.on('install', () => {
  service.start()
  console.log('Service installed.')
})

service.on('uninstall', () => {
  console.log('Service uninstalled.')
})

service.on('error', err => console.error(''+err))

if (process.argv.includes('install')) {
  service.install()
} else if (process.argv.includes('uninstall')) {
  service.uninstall()
}