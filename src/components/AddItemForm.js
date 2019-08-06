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

export default ({ itemId }) => {
  const context = useContext(DataContext)
  const { addItem, items, updateItem } = context
  const now = new Date()
  const item = itemId ? items.find(i => Number(i.id) === Number(itemId)) : null

  const [text, setText] = useState(item ? item.text : '')
  const [date, setDate] = useState(item ? new Date(item.time) : now)
  const [time, setTime] = useState(item ? new Date(item.time) : now)
  const [format, setFormat] = useState(item ? item.format : timeFormats.days.tag)
  const [goal, setGoal] = useState(item ? item.goal : null)

  const updateText = e => setText(e.target.value)
  const updateDate = date => setDate(date)
  const updateTime = date => setTime(date)
  const updateFormat = e => setFormat(e.target.value)
  const updateGoal = e => setGoal(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)
  const add = e => {
    e.preventDefault()
    const combined = getCombinedDatetime(date, time).getTime()
    const itemData = {
      text,
      time: combined,
      format,
      goal: goal > 0 ? goal : null,
    }
    if (itemId && item && item.id) {
      updateItem(Object.assign(item, itemData))
    } else {
      addItem(itemData)
    }
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
          <Grid item xs={12}>
            <Box style={{ marginTop: '3vh' }}>
              <Typography variant="body1" paragraph>
                You can set a goal. The task will be marked as completed as soon as you reach the time goal.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="goal">Goal</InputLabel>
            <TextField
              type="number"
              id="goal"
              name="goal"
              value={goal || 0}
              onChange={updateGoal}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{ marginTop: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="goal-format-helper">Format</InputLabel>
            <Select
              value={format}
              onChange={updateFormat}
              inputProps={{ name: 'goal-format', id: 'goal-format-helper' }}
              disabled
            >
              {formatOptions(timeFormats)}
            </Select>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}
