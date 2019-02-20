import React, { useEffect } from "react"
import PropTypes from "prop-types"

import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt'

import { Link } from "gatsby"
import { API_HOST } from '$src/const'

const styles = theme => ({
  root: tw`static py-3`,
  brand: tw`mr-4`,
  sectionDesktop: tw`flex-grow xs:hidden md:flex`,
  sectionMobile: tw`flex-grow xs:flex md:hidden`,
  icon: tw`text-lg`
})

const Spacer = () => <span style={tw`flex-grow`} />

const Header = ({ classes, departments, fetchDepartments }) => {
  useEffect(() => {
    fetchDepartments()
  }, [])
  return (
    <AppBar color='inherit' className={classes.root}>
      <Toolbar>
        <img src={API_HOST + '/tshirtshop.png'} className={classes.brand} />
        <div className={classes.sectionDesktop}>
          {departments && departments.map(d => (
            <Button key={d.department_id}>{d.name}</Button>
          ))}
          <Spacer />
          <IconButton className={classes.icon}>
            <FontAwesomeIcon icon={faUserAlt} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default withStyles(styles)(Header)
