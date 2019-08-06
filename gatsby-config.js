const {
  lightBackground,
  lightPrimary,
} = require('./src/styles/colors')

module.exports = {
  pathPrefix: `/how-long-since-site`,
  siteMetadata: {
    title: `How long since...?`,
    description: `Track how long since the last time you did something that you want to track`,
    author: `@g0ldstripes`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: lightBackground,
        theme_color: lightPrimary,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/update/*`] },
    }
  ],
}
