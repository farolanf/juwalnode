import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from '@reach/router'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { fade } from '@material-ui/core/styles/colorManipulator'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

import { Link } from "gatsby"
import { API_HOST, PREFIX } from '$src/const'

import LoginBox from '$comp/login'
import commonStyles from '$styles/common'

import { logout } from "$lib/auth";

const styles = theme => ({
  ...commonStyles(theme),
  root: tw`static py-3`,
  brand: tw`mr-4`,
  sectionDesktop: tw`flex-grow xs:hidden md:flex`,
  sectionMobile: tw`flex-grow xs:flex md:hidden`,
  iconButton: {
    width: 48,
    height: 48
  },
  icon: tw`text-lg`,
  search: {
    ...tw`flex items-center rounded`,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.03)
    }
  },
  searchIcon: {
    ...tw`w-16 flex justify-center`,
    color: fade(theme.palette.common.black, 0.45)
  },
  searchInput: {
    transition: theme.transitions.create('width'),
    width: 130,
    '&:focus': {
      width: 200
    }
  }
})

const ProfileMenu = ({ classes, user }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  function handleLogout () {
    logout()
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={e => setAnchorEl(e.currentTarget)}
        className={classes.iconButton}
      >
        <FontAwesomeIcon icon={faUserAlt} className={classes.icon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

const Spacer = () => <span style={tw`flex-grow`} />

const Header = ({
  classes,
  theme,
  departments,
  fetchDepartments,
  clearFilters,
  setQuery: setSearchQuery,
  user,
  loggedIn,
}) => {
  useEffect(() => {
    fetchDepartments()
  }, [])

  const [query, setQuery] = useState('')

  function handleSubmitQuery (e) {
    e.preventDefault()
    clearFilters()
    setSearchQuery(query)
    setQuery('')
    navigate(PREFIX + '/browse?q=' + query)
  }

  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <AppBar color='inherit' className={classes.root}>
      <Toolbar>
        <Link to='/'>
          <img src={API_HOST + '/tshirtshop.png'} className={classes.brand} />
        </Link>
        <div className={classes.sectionDesktop}>
          <Grid container spacing={theme.spacing.unit} alignItems='center'>
            {departments && departments.map(d => (
              <Grid item key={d.department_id}>
                <Button>
                  <Link to={'/browse/' + d.name.toLowerCase()} className={classes.link}>
                    {d.name}
                  </Link>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Spacer />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <form onSubmit={handleSubmitQuery}>
              <InputBase
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Search...'
                classes={{ input: classes.searchInput }}
              />
            </form>
          </div>
          {loggedIn ? (
            <>
              <IconButton className={classes.iconButton}>
                <Link to='/cart' className={classes.link}>
                  <FontAwesomeIcon icon={faShoppingCart} className={classes.icon} />
                </Link>
              </IconButton>
              <ProfileMenu classes={classes} user={user} />
            </>
          ) : (
            <Button onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
          <LoginBox open={loginOpen} onClose={() => setLoginOpen(false)} />
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

export default withStyles(styles, { name: 'header', withTheme: true })(Header)
