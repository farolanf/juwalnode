const path = require('path')

const env = process.env.NODE_ENV || 'development'
require('dotenv').config({
  path: path.resolve(__dirname, './.env.' + env)
})

const theme = require('./src/theme')

module.exports = {
  siteMetadata: {
    title: `TShirtShop`,
    description: `Online shop`,
    author: `Farolan Faisal`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-tailwindcss`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme,
        dangerouslyUseGlobalCSS: true
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/browse/*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}

if (process.env.GATSBY_PATH_PREFIX) {
  module.exports.pathPrefix = process.env.GATSBY_PATH_PREFIX
}
