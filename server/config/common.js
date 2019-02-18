module.exports = {
  // app options
  app: {
    port: 3000,
    apiBase: '/api/v1'
  },

  // specify modules to load and their order
  modules: [
    'devel',
    'data',
    'auth',
    'finale',
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
          // protected resources - only owner can access
          { path: '/customers/\\d+', method: ['GET', 'PUT'] },
          { path: '/orders/\\d+', method: ['GET', 'PUT'] },
          { path: '/orderDetails/\\d+', method: ['GET', 'PUT'] },
          { path: '/shoppingCarts/\\d+', method: ['GET', 'PUT'] },
        ]
      },
      // admin passed all checks
      admin: true
    },

    // permissions bypass these methods
    publicMethods: ['HEAD', 'OPTIONS'],
  },
}