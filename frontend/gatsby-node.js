/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
import path from 'path'

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        $prj: path.resolve(__dirname, '..'),
        $src: __dirname,
        $comp: path.resolve(__dirname, './components'),
        $con: path.resolve(__dirname, './containers'),
        $act: path.resolve(__dirname, './store/actions'),
      }
    }
  })
}