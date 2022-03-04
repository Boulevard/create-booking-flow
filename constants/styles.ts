import { colors } from './colors'
import { Theme } from '@mui/material'

export const stepScreen = (theme: Theme) => {
    return {
        root: (isMobile: boolean) => {
            return {
                minHeight: '100%',
                padding: theme.spacing(
                    !isMobile ? 6 : 17,
                    !isMobile ? 10 : 2,
                    !isMobile ? 6 : 2
                ),
            }
        },
        blurScreen: {
            '-webkit-filter': 'blur(20px)',
            '-moz-filter': 'blur(20px)',
            ' -o-filter': 'blur(20px)',
            '-ms-filter': 'blur(20px)',
            filter: 'blur(20px)',
            opacity: '0.6',
            'pointer-events': 'none',
        },
        loader: {
            'z-index': '1',
            top: '50%',
            left: 'calc(50% - 30px)',
            '-webkit-filter': 'blur(1px)',
            '-moz-filter': 'blur(1px)',
            '-o-filter': 'blur(1px)',
            '-ms-filter': 'blur(1px)',
            filter: 'blur(1px)',
            opacity: '1',
        },
    }
}
