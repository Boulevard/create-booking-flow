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
import { AppHead } from 'components/atoms/AppHead'

/**
 * A custom App in Next.js gives us the ability to customize global
 * elements like Nav, global context providers, and meta tagging +more.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
export default function App({ Component, pageProps }) {
    // MUI<->Next compatibility: Clears out MUI server-side generated CSS
    // https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js

    return (
        <RecoilRoot>
            <AppHead/>
            <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
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
                </LocalizationProvider>
            </ThemeProvider>
        </RecoilRoot>
    )
}
