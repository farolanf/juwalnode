module.exports = function(options) {
  return {
    email: {
      presence: true,
      email: true,
      uniqueEmail: {
        app: options.uniqueEmail.app
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 20
      }
    }
  }
}