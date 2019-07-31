import React from 'react'
import { List } from '@material-ui/core'
import ItemListItem from './ItemListItem'

export default ({ items }) => {
  return (
    <>
    <List>
      {items.map(item => <ItemListItem key={item.id} item={item} />)}
    </List>
    <div className="breakline" />
    </>
  )
}
