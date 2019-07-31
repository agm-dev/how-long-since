import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import DateFnsUtils from '@date-io/date-fns'
import { DataContext } from '../context/DataContext'
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import {
  Create as CreateIcon
} from '@material-ui/icons'
import {
  lightPrimary,
  darkFont,
} from '../styles/colors'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { getCombinedDatetime, timeFormats } from '../utils/time.utils'

const formatOptions = data => Object
  .entries(data)
  .map(([key, item], index) => <MenuItem key={index} value={item.tag}>{key}</MenuItem>)

export default (props) => {
  const context = useContext(DataContext)
  const { addItem } = context
  const now = new Date()

  const [text, setText] = useState('')
  const [date, setDate] = useState(now)
  const [time, setTime] = useState(now)
  const [format, setFormat] = useState(timeFormats.days.tag)

  const updateText = e => setText(e.target.value)
  const updateDate = date => setDate(date)
  const updateTime = date => setTime(date)
  const updateFormat = e => setFormat(e.target.value)
  const add = e => {
    e.preventDefault()
    const combined = getCombinedDatetime(date, time).getTime()
    addItem({
      text,
      time: combined,
      format,
    })
    navigate('/')
  }

  return (
    <form noValidate autoComplete="off">
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="main-content">
              <Typography variant="body1" paragraph>
                Introduce the text for describing your event. You can use the # symbol to mark the space where the time and format will be displayed.
              </Typography>
              <Typography variant="body2">
                <em>Example: # from the last beer.</em>
              </Typography>
            </Box>
            <TextField
              required
              id="text"
              name="text"
              label="Event"
              value={text}
              onChange={updateText}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="date-helper">Date</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={date}
                onChange={updateDate}
                emptyLabel="date"
                id="date-helper"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="time-helper">Time</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                value={time}
                onChange={updateTime}
                ampm={false}
                id="time-helper"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="format-helper">Format</InputLabel>
            <Select
              value={format}
              onChange={updateFormat}
              inputProps={{ name: 'format', id: 'format-helper' }}
            >
              {formatOptions(timeFormats)}
            </Select>
          </Grid>
        </Grid>
        <Box className="buttons-container">
          <Button
            variant="contained"
            size="medium"
            onClick={add}
            style={{
              backgroundColor: lightPrimary,
              color: darkFont,
            }}
          >
            <CreateIcon className="icon" />
            Add
          </Button>
        </Box>
      </Container>
    </form>
  )
}
