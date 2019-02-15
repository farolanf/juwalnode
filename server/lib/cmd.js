/* eslint-disable no-console */

// Provide commands supplied by modules.

const path = require('path')
const program = require('commander')
const _ = require('lodash')

const handlers = {}

function printCommands() {
  _.each(handlers, (commands, moduleName) => {
    console.log(moduleName)
    _.each(commands, (command, name) => {
      console.log(`\t${moduleName}:${name}`, '-', command.desc)
    })
  })
}

function addCommand(moduleName, name, desc, handler) {
  _.merge(handlers, {
    [moduleName]: {
      [name]: { name, desc, handler }
    }
  })
}

function runCommand(fullName) {
  let moduleName, cmd
  const names = fullName.split(':')
  if (!names.length) {
    throw new Error('Invalid command')
  } else if (names.length === 1) {
    moduleName = 'app'
    cmd = names[0]
  } else {
    moduleName = names[0]
    cmd = names[1]
  }
  const argv = process.argv.slice()
  argv[0] = path.basename(argv[0])
  argv[1] = argv[0] + ' ' + path.basename(argv[1]) + ' ' + argv.splice(2, 1)[0]
  _runCommand(moduleName, cmd, argv)
}

function _runCommand(moduleName, cmd, argv) {
  if (!handlers[moduleName]) {
    throw new Error('Invalid module')
  }
  if (!handlers[moduleName][cmd]) {
    throw new Error('Invalid command')
  }
  handlers[moduleName][cmd].handler(program, argv)
}

module.exports = {
  add: addCommand,
  run: runCommand,
  print: printCommands
}