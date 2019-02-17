module.exports = {
  // app options
  app: {
    port: 3000,
    apiBase: '/api/v1'
  },

  // specify modules to load and their order
  modules: [
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
          { path: '/auth/google', method: 'GET' },
          { path: '/auth/facebook', method: 'GET' },
          { path: '/auth/register', method: 'POST' },
          { path: '/auth/logout', method: 'GET' },
          { path: '/auth/verify', method: 'GET' },
          { path: '/auth/unique-email', method: 'GET' },

          // public resources
          { path: '/Departments(/.*)?', method: 'GET' },
          { path: '/Categories(/.*)?', method: 'GET' },
          { path: '/ProductCategories(/.*)?', method: 'GET' },
          { path: '/Products(/.*)?', method: 'GET' },
          { path: '/ProductAttributes(/.*)?', method: 'GET' },
          { path: '/Attributes(/.*)?', method: 'GET' },
          { path: '/AttributeValues(/.*)?', method: 'GET' },
          { path: '/Reviews(/.*)?', method: 'GET' },
          { path: '/Taxes(/.*)?', method: 'GET' },
          { path: '/Shippings(/.*)?', method: 'GET' },
          { path: '/ShippingRegions(/.*)?', method: 'GET' },
        ]
      },
      customer: {
        routes: [
          // protected resources - only owner can access
          { path: '/Customers/\\d+', method: ['GET', 'PUT'] },
          { path: '/Orders/\\d+', method: ['GET', 'PUT'] },
          { path: '/OrderDetails/\\d+', method: ['GET', 'PUT'] },
          { path: '/ShoppingCarts/\\d+', method: ['GET', 'PUT'] },
        ]
      },
      // admin passed all checks
      admin: true
    },

    // permissions bypass these methods
    publicMethods: ['HEAD', 'OPTIONS'],
  },
}