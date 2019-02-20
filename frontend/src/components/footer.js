import React, { useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'

import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faMedium } from '@fortawesome/free-brands-svg-icons/faMedium'

const styles = () => ({
  paper: tw`flex flex-col p-8`,
  nav: tw`flex-grow flex justify-center mb-2`,
  social: tw`flex-grow flex justify-center mb-3`,
  copyright: tw`flex-grow flex justify-center`,
})

const Footer = ({ classes, departments, fetchDepartments }) => {
  useEffect(() => {
    fetchDepartments()
  }, [])
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              author
            }
          }
        }
      `}
    >
      {data => (
        <footer>
          <Paper className={classes.paper}>
            <div className={classes.nav}>
              {departments && departments.map(d => (
                <Button>{d.name}</Button>
              ))}
            </div>
            <div className={classes.social}>
              <IconButton><FontAwesomeIcon icon={faInstagram} /></IconButton>
              <IconButton><FontAwesomeIcon icon={faFacebook} /></IconButton>
              <IconButton><FontAwesomeIcon icon={faTwitter} /></IconButton>
              <IconButton><FontAwesomeIcon icon={faMedium} /></IconButton>
            </div>
            <div className={classes.copyright}>
              <Typography variant='caption'>
                © {new Date().getFullYear()} {data.site.siteMetadata.author}
              </Typography>
            </div>
          </Paper>
        </footer>
      )}
    </StaticQuery>
  )
}

export default withStyles(styles)(Footer)