import Head from 'next/head'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Header } from 'components/molecules/Header'
import { ThemeProvider } from 'styles/theme'
import 'lib/styles/styles.scss'
import 'lib/styles/styles.daypicker.scss'
import 'bootstrap/dist/css/bootstrap.css'
import { FlowRouting } from 'components/molecules/FlowRouting'
import { CartDefinition } from 'components/molecules/CartInitializer/CartDefinition'
import { useGoogleAnalytics } from 'lib/analytics-api/googleAnalyticsUtils'
import { useRouter } from 'next/router'
import Brand from 'config/brand.json'
import { useConfig } from 'lib/sdk/hooks/useConfig'

/**
 * A custom App in Next.js gives us the ability to customize global
 * elements like Nav, global context providers, and meta tagging +more.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
export default function App({ Component, pageProps }) {
    // MUI<->Next compatibility: Clears out MUI server-side generated CSS
    // https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
    const googleAnalytics = useGoogleAnalytics()
    const googleAnalyticsKey = googleAnalytics.googleAnalyticsKey
    const router = useRouter()
    const { googleMapsApiAccessToken } = useConfig()
    const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiAccessToken}&libraries=places`

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
        <>
            <Head>
                <title>Create - Booking - Flow</title>
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

                {googleMapsApiAccessToken && (
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
                <link
                    href={
                        'https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css'
                    }
                    rel="stylesheet"
                />
                <script
                    async
                    src={
                        'https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js'
                    }
                />
            </Head>

            <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
                    <RecoilRoot>
                        <FlowRouting />
                        <CartDefinition />
                        <div
                            className="background-container"
                            style={{ flex: 1 }}
                        >
                            <Header />
                            {/* <MobileSummary /> */}
                            <Component {...pageProps} />
                        </div>
                    </RecoilRoot>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    )
}
