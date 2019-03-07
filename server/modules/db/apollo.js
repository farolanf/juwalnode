const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')

module.exports = (app, config) => {
  const server = new ApolloServer({ schema })
  server.applyMiddleware({ app })
}