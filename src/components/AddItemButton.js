import React from 'react'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'gatsby'

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
      color="primary"
      aria-label="add"
      variant="round"
    >
      <AddIcon />
    </Fab>
  </Link>
)
