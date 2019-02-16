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
          { path: '/auth/unique-email', method: 'POST' },
        ]
      },
      customer: {
        routes: [
        ]
      },
      // admin passed all checks
      admin: true
    },

    // permissions bypass these methods
    publicMethods: ['HEAD', 'OPTIONS'],
  },
}