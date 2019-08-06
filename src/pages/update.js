import React from "react"
import { Router } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"
import AddItemForm from '../components/AddItemForm'

export default () => (
  <Layout>
    <SEO title="Add" />
    <Router>
      <AddItemForm path="/update/:itemId" />
    </Router>
  </Layout>
)
