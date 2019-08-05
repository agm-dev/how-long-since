import React from 'react'
import { Link } from 'gatsby'
import {
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
} from '@material-ui/icons'
import {
  darkFont,
} from '../styles/colors'

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        edge="start"
        aria-label="home"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon style={{ color: darkFont }} />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/">
          <MenuItem>Events</MenuItem>
        </Link>
        <Link to="/add">
          <MenuItem>Add</MenuItem>
        </Link>
        <Link to="/data">
          <MenuItem>Import / Export</MenuItem>
        </Link>
      </Menu>
    </>
  )
}