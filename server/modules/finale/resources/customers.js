const { handleError } = require('../../../lib/helpers')
const schemas = require('../schemas/customers')

module.exports = function initResource (resource) {
  resource.update.send.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        const params = schemas.update.cast(req.body, { stripUnknown: true })

        if (!params || ! await schemas.update.isValid(params)) {
          return res.sendStatus(400)
        }

        context.attributes = {
          ...params,
          customer_id: req.user.Customer.customer_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })
}