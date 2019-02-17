import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { withStyles } from '@material-ui/core/styles'

import Header from "./header"
import containerStyle from '$styles/container'

const styles = theme => ({
  root: {
    margin: '0 auto',
    ...containerStyle(theme)
  }
})

const Layout = ({ classes, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <div className={classes.root}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} {data.site.siteMetadata.author}
        </footer>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Layout)
