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
  TextField
} from '@material-ui/core'

export default () => {
  const context = useContext(DataContext)
  const {
    items,
    importData,
    exportData,
  } = context

  const exportString = exportData(items)
  const [code, setCode] = useState(exportString)
  const updateCode = e => setCode(e.target.value)
  const copyHandler = e => {
    e.preventDefault()
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
              variant="contained"
              size="medium"
              onClick={copyHandler}
            >
              Copy
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={importHandler}
              disabled={code === exportString}
              style={{ marginLeft: '25px' }}
            >
              Import
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
