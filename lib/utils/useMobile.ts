import { useMediaQuery } from '@mui/material'
import { isMobile as isMobileNative } from 'react-device-detect'

export const useMobile = (mediaQuery: string | undefined = undefined) => {
    const isMobile = !useMediaQuery(mediaQuery ?? '(min-width:930px)', {
        defaultMatches: !isMobileNative,
    })
    return {
        isMobile: isMobile,
    }
}
