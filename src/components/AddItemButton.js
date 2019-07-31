import React from 'react'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'gatsby'
import {
  lightPrimary,
  darkFont,
} from '../styles/colors'

export default ({ to }) => (
  <Link
    to={to}
    style={{
      position: 'fixed',
      bottom: '2vh',
      right: '2vh',
    }}
  >
    <Fab
      aria-label="add"
      variant="round"
      style={{
        backgroundColor: lightPrimary,
        color: darkFont,
      }}
    >
      <AddIcon />
    </Fab>
  </Link>
)
