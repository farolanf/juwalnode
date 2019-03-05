const path = require('path')

module.exports = {
  // app options
  app: {
    port: 3000,
    apiBase: '/api/v1',
  },

  templatesDir: path.resolve(__dirname, '../templates'),

  // specify modules to load and their order
  modules: [
    'data',
    'auth',
    'finale',
    'elasticsearch',
    'order',
    'customer',
    'checkout',
  ],

  // module options

  auth: {
    jwtSecret: ']ZW%/tOrZ:PeI,y5~C|y4rWoPQtx%g',

    // new customers will be assigned to these groups
    defaultGroups: ['public', 'customer'],

    groups: {
      public: {
        // routes white list
        //
        // e.g:
        //   '/products'
        //   is the same as
        //   { path: '/products', method: 'GET' }
        //
        //   multiple methods
        //   { path: '/products', method: ['GET', 'POST'] }
        //
        // path can be a RegExp or pattern
        routes: [
          { path: '/auth/local', method: 'POST' },
          { path: '/auth/google', method: 'GET' },
          { path: '/auth/facebook', method: 'GET' },
          { path: '/auth/register', method: 'POST' },
          { path: '/auth/logout', method: 'GET' },
          { path: '/auth/verify', method: 'GET' },
          { path: '/auth/unique-email', method: 'GET' },

          { path: '/search/.*', method: 'GET' },

          // public resources
          { path: '/departments(/.*)?', method: 'GET' },
          { path: '/categories(/.*)?', method: 'GET' },
          { path: '/productcategories(/.*)?', method: 'GET' },
          { path: '/products(/.*)?', method: 'GET' },
          { path: '/productattributes(/.*)?', method: 'GET' },
          { path: '/attributes(/.*)?', method: 'GET' },
          { path: '/attributeValues(/.*)?', method: 'GET' },
          { path: '/reviews(/.*)?', method: 'GET' },
          { path: '/taxes(/.*)?', method: 'GET' },
          { path: '/shippings(/.*)?', method: 'GET' },
          { path: '/shippingregions(/.*)?', method: 'GET' },
        ]
      },
      customer: {
        routes: [
          { path: '/shoppingcarts(/.*)?', method: '*' },
          { path: '/customers(/.*)?', method: 'PUT' },
          { path: '/paypal/.*', method: ['GET', 'POST']},
        ]
      },
      // admin passed all checks
      admin: true
    },

    // permissions bypass these methods
    publicMethods: ['HEAD', 'OPTIONS'],
  },

  elasticsearch: {
    index: 'tshirtshop',
    maxCount: 100
  }
}