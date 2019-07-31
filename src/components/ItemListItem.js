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

  return (
    <Card key={item.id} style={{
      marginBottom: '2vh',
      paddingTop: '1vh',
      paddingBottom: '1vh',
      backgroundColor: '#e8eaf6',
    }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar aria-label={displayText} style={{ backgroundColor: '#5c6bc0' }}>
            {formatKey[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        <ListItemText primary={displayText} />

        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={remove}>
            <DeleteIcon />
          </IconButton>

        </ListItemSecondaryAction>
      </ListItem>
    </Card>
  )
}
