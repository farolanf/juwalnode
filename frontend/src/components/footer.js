import React, { useEffect } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faMedium } from '@fortawesome/free-brands-svg-icons/faMedium'

import commonStyles from '$styles/common'

import { PREFIX } from '$src/const'

const styles = theme => ({
  ...commonStyles(theme),
  paper: tw`flex flex-col p-8`,
  nav: tw`mb-0`,
  social: tw`flex-grow flex justify-center mb-3`,
  copyright: tw`flex-grow flex justify-center`,
  department: {
    flexGrow: 0,
    textAlign: 'center'
  },
  admin: tw`flex justify-center mb-3 text-sm`
})

const Footer = ({ classes, theme, departments, fetchDepartments }) => {
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
            <Grid container justify='center' spacing={theme.spacing.unit} className={classes.nav}>
              {departments && departments.map(d => (
                <Grid item xs={12} md className={classes.department} key={d.department_id}>
                  <Button>
                    <Link to={'/browse/' + d.name.toLowerCase()} className={classes.link}>
                      {d.name}
                    </Link>
                  </Button>
                </Grid>
              ))}
            </Grid>
            <div className={classes.social}>
              <IconButton><FontAwesomeIcon icon={faInstagram} /></IconButton>
              <IconButton><FontAwesomeIcon icon={faFacebook} /></IconButton>
              <IconButton><FontAwesomeIcon icon={faTwitter} /></IconButton>
              <IconButton><FontAwesomeIcon icon={faMedium} /></IconButton>
            </div>
            <div className={classes.admin}>
                <a href={PREFIX + '/admin'} className={classes.link}>Admin</a>
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

export default withStyles(styles, { withTheme: true })(Footer)