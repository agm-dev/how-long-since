import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from '@reach/router'
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
    <StaticQuery
      query={graphql`
        query PathPrefix {
          site {
            pathPrefix
          }
        }
      `}
      render={data => (
        <>
          <List>
            {sortedItems.map(item => (
              <Link
                to={`${process.env.NODE_ENV === 'production' ? data.site.pathPrefix : ''}/update/${item.id}`}
                key={item.id}
                className="pointer"
              >
                <ItemListItem item={item} />
              </Link>
            ))}
          </List>
          <div className="breakline" />
        </>
      )}
    />
  )
}
