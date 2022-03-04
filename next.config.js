const withTM = require('next-transpile-modules')(['@boulevard/blvd-book-sdk'])

// Note: These variables can be named however you'd like, but be sure what you set in your environment(s)
// match what's in here!
module.exports = withTM({
    env: {
            NEXT_PUBLIC_MAPBOX_TOKEN: process.env.MAPBOX_API_TOKEN_DEVELOPMENT,
            NEXT_PUBLIC_BLVD_BUSINESS_ID: process.env.NEXT_PUBLIC_BLVD_BUSINESS_ID,
            NEXT_PUBLIC_BLVD_API_KEY: process.env.NEXT_PUBLIC_BLVD_API_KEY,
            NEXT_PUBLIC_BLVD_DEFAULT_LOCATION_EXTERNAL_ID:
              process.env.NEXT_PUBLIC_BLVD_DEFAULT_LOCATION_EXTERNAL_ID_DEVELOPMENT,
            GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY_DEVELOPMENT,
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY_DEVELOPMENT,
        },
})
