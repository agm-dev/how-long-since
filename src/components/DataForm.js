import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import { DataContext } from '../context/DataContext'
import {
  Button,
  Grid,
  Typography,
  Box,
  Container,
  InputLabel,
  TextField,
  Popover,
} from '@material-ui/core'
import {
  FileCopy as FileCopyIcon,
  ImportExport as ImportExportIcon,
} from '@material-ui/icons'
import {
  lightPrimary,
  darkFont,
} from '../styles/colors'

const exportData = items => {
  const stringified = JSON.stringify(items)
  const encoded = encodeURI(stringified)
  return typeof btoa !== 'undefined' ? btoa(encoded) : encoded
}

export default () => {
  const context = useContext(DataContext)
  const {
    items,
    importData,
  } = context

  const exportString = exportData(items)
  const [code, setCode] = useState(exportString)
  const [anchorEl, setAnchorEl] = useState(null) // popover
  const updateCode = e => setCode(e.target.value)
  const copyHandler = e => {
    e.preventDefault()
    setAnchorEl(e.currentTarget) // this is not really true.. it could fail
    navigator.permissions.query({ name: 'clipboard-write' })
      .then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(code)
            .then(
              () => console.log('code copied to clipboard'),
              () => console.warn('failed to copy code into clipboard')
            )
        }
      })
  }
  const closePopoverHandler = () => setAnchorEl(null)
  const importHandler = e => {
    e.preventDefault()

    if (code === exportString) {
      return
    }

    try {
      importData(code)
    } catch (e) {
      console.log('error on importing data', e.message)
    }

    console.log('data has been imported')
    navigate('/')
  }

  const popoverOpen = Boolean(anchorEl)
  const popoverId = popoverOpen ? 'simple-popover' : undefined

  const buttonColors = {
    backgroundColor: lightPrimary,
    color: darkFont,
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className="main-content">
            <Typography variant="body1" paragraph>
              The code below contains your data, and you can copy and save it to import the data in other device.
            </Typography>
            <Typography variant="body1" paragraph>
              You can also remove the code, paste a different code instead, and import the data.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="data">Code</InputLabel>
          <TextField
            required
            id="data"
            name="data"
            multiline
            rowsMax="13"
            value={code}
            onChange={updateCode}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box className="buttons-container">
            <Button
              aria-describedby={popoverId}
              variant="contained"
              size="medium"
              onClick={copyHandler}
              style={buttonColors}
            >
              <FileCopyIcon className="icon" />
              Copy
            </Button>
            <Popover
              id={popoverId}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={closePopoverHandler}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography variant="body1" style={{ padding: '5px' }}>
                The code has been copied to your clipboard.
              </Typography>
            </Popover>
            <Button
              variant="contained"
              size="medium"
              onClick={importHandler}
              disabled={code === exportString}
              style={Object.assign(
                { marginLeft: '25px' },
                code === exportString ? {} : buttonColors,
              )}
            >
              <ImportExportIcon className="icon" />
              Import
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
