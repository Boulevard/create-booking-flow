import Head from 'next/head'
import Brand from 'config/brand.json'
import { MapType, useAppConfig } from 'lib/state/config'
import { useGoogleAnalytics } from 'lib/analytics-api/googleAnalyticsUtils'
import { useRouter } from 'next/router'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { useEffect } from 'react'

export const AppHead = () => {
    const googleAnalytics = useGoogleAnalytics()
    const googleAnalyticsKey = googleAnalytics.googleAnalyticsKey
    const router = useRouter()
    const { googleMapsApiAccessToken, mapboxApiAccessToken } = useConfig()
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiAccessToken}&libraries=places`
    const isMapBox = !!mapboxApiAccessToken && mapType === MapType.MapBox

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        jssStyles?.parentElement?.removeChild(jssStyles)
    }, [])

    // Google Analytics: log page views
    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            googleAnalytics.pageView(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [googleAnalytics, router.events])

    return (
        <Head>
            <title>Salon - Booking</title>
            {/* SEO */}
            <meta itemProp="name" content={Brand.name} />
            <meta itemProp="description" content={Brand.description} />

            {/* Icons */}
            <link rel="icon" type="image/x-icon" href={Brand.icon} />
            <link
                rel="shortcut icon"
                type="image/x-icon"
                href={Brand.icon}
            />
            <link
                rel="shortcut icon"
                type="image/x-icon"
                href={Brand.icon}
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={Brand.icon}
            />

            {/* Fonts */}
            <link
                rel="prefetch"
                href={'/assets/Roboto-Bold.ttf'}
                as="font"
                crossOrigin=""
            />
            <link
                rel="prefetch"
                href={'/assets/Roboto-Medium.ttf'}
                as="font"
                crossOrigin=""
            />
            <link
                rel="prefetch"
                href={'/assets/Roboto-Regular.ttf'}
                as="font"
                crossOrigin=""
            />

            {/* Other Meta */}
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
            />

            {mapType === MapType.Google && googleMapsApiAccessToken && (
                <script async src={googlePlacesApiUrl} />
            )}

            {/* Global Site Tag (gtag.js) - Google Analytics */}
            {googleAnalyticsKey && (
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsKey}`}
                />
            )}
            {googleAnalyticsKey && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${googleAnalyticsKey}', {
                              page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            )}
            {isMapBox && <link
                href={
                    'https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css'
                }
                rel="stylesheet"
            />}
            {isMapBox && <script
                async
                src={
                    'https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js'
                }
            />}
        </Head>
    )
}
