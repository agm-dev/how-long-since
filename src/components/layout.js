/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Grid } from '@material-ui/core'

import Header from "./header"
import '../styles/index.scss'
import { lightBackground, lightFont } from '../styles/colors'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Grid
        container
        spacing={3}
        className="container"
        style={{
          backgroundColor: lightBackground,
          color: lightFont,
        }}
      >
        {/* Main content section */}
        <Grid item xs={12}>
          {children}
        </Grid>
        {/* Footer section */}
      </Grid>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
