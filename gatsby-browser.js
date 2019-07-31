/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { DataProvider } from './src/context/DataContext'

export const wrapRootElement = ({ element }) => (
  <DataProvider>
    {element}
  </DataProvider>
)
