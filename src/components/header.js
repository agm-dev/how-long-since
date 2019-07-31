import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import {
  lightPrimary,
  darkFont,
} from '../styles/colors'

import Menu from './Menu'

const Header = ({ siteTitle }) => {
  const headerHeight = 70
  return (
    <>
      <AppBar
        position="static"
        style={{
          position: 'fixed',
          marginLeft: '-8px', // to remove margin 8px on body
          marginTop: '-8px', // to remove margin 8px on body
          backgroundColor: lightPrimary,
          color: darkFont,
        }}
      >
        <Toolbar style={{
          minHeight: `${headerHeight}px`,
        }}>
          <Menu />
          <Link to="/" >
            <Typography variant="h6">{siteTitle}</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <div style={{
          minHeight: `${headerHeight}px`,
      }} />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
