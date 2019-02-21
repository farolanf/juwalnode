/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        $prj: path.resolve(__dirname),
        $src: path.resolve(__dirname, 'src'),
        $lib: path.resolve(__dirname, 'src/lib'),
        $comp: path.resolve(__dirname, 'src/components'),
        $con: path.resolve(__dirname, 'src/containers'),
        $act: path.resolve(__dirname, 'src/store/actions'),
        $styles: path.resolve(__dirname, 'src/styles'),
      }
    }
  })
}

exports.createPages = ({ actions: { createPage } }) => {
  createPage({
    path: '/search',
    component: path.resolve(__dirname, './src/pages/browse.js')
  })
}