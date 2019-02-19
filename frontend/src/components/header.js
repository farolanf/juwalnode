import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { API_HOST } from '$src/const'

const Header = () => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img src={API_HOST + '/tshirtshop.png'} />
        </Link>
      </h1>
      <Link to='/browse'>Browse</Link>
      <Link to='/admin'>Admin</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
