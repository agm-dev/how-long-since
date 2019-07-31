import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography, Button } from '@material-ui/core'


export default () => (
  <Layout>
    <SEO title="404: Not found" />
    <Typography variant="subtitle1" paragraph>
      Are you lost?
    </Typography>
    <Link to="/">
      <Button
        variant="contained"
        size="medium"
        color="primary"
      >
        Go Home
      </Button>
    </Link>
  </Layout>
)
