import React from 'react'
import { List } from '@material-ui/core'
import ItemListItem from './ItemListItem'

export default ({ items }) => {

  const [completed, uncompleted] = items.reduce(([completed, uncompleted], item) => {
    if (item.isCompleted) {
      return [[item, ...completed], uncompleted]
    }
    return [completed, [...uncompleted, item]]
  }, [[], []])

  const sortedItems = [...uncompleted, ...completed]

  return (
    <>
    <List>
      {sortedItems.map(item => <ItemListItem key={item.id} item={item} />)}
    </List>
    <div className="breakline" />
    </>
  )
}
