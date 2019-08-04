import React, { useState, useContext } from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Card,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
} from '@material-ui/icons'
import {
  lightPrimary,
  lightSecondary,
  lightFont,
} from '../styles/colors'
import { DataContext } from '../context/DataContext'
import { timeFormats, useInterval } from '../utils/time.utils'

export default ({ item }) => {
  const { removeItem } = useContext(DataContext)
  const remove = () => removeItem(item)

  const formatKey = Object
    .entries(timeFormats)
    .find(([key, data]) => data.tag === item.format)
    .shift()
  const delay = timeFormats[formatKey].value

  const getDisplayText = () => item.text.replace('#', `${item.howLong} ${formatKey}`)

  const [displayText, setDisplayText] = useState(getDisplayText())
  useInterval(() => {
    setDisplayText(getDisplayText())
  }, delay)

  const goalText = item.goal ? `Goal: ${item.goal} ${formatKey}` : ''
  const recordText = item.record ? `Record: ${item.howLongRecord} ${formatKey}` : ''
  const secondaryText = `${goalText}${goalText.length ? '. ' : ''}${recordText}`

  return (
    <Card key={item.id} style={{
      marginBottom: '2vh',
      paddingTop: '1vh',
      paddingBottom: '1vh',
      backgroundColor: lightSecondary,
      color: lightFont,
    }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar aria-label={displayText} style={{ backgroundColor: lightPrimary }}>
            {formatKey[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={displayText}
          secondary={secondaryText}
        />

        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={remove}>
            <DeleteIcon />
          </IconButton>

        </ListItemSecondaryAction>
      </ListItem>
    </Card>
  )
}
