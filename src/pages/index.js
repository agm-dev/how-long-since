import React, { useContext } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ItemsList from '../components/ItemsList'
import AddItemButton from '../components/AddItemButton'
import { DataContext } from '../context/DataContext'
import { Typography, Box } from '@material-ui/core'

const IndexPage = () => {
  const context = useContext(DataContext)
  const { items } = context

  return (
    <Layout>
      <SEO title="Home" />
      <Box className="main-content">
        {
          items.length ?
          (
            <>
              <Typography variant="subtitle1">
                You are tracking {items.length} events:
              </Typography>
              <ItemsList items={items} />
            </>
          ) :
          <Typography>Try to add some events!</Typography>
        }
      </Box>
      <AddItemButton to="/add" />
    </Layout>
  )
}

export default IndexPage
