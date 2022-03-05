import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { stepScreen } from 'constants/styles'

interface LeftStylesProps {
    displaySearch: boolean
}

export const useLeftPanelStyles = makeStyles((theme: Theme) => ({
    searchBlock: {
        height: (props: LeftStylesProps) => props.displaySearch ? '108px' : '56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
    },
    mobileSearchBlock: {
        position: 'fixed',
        top: '46px',
        padding: theme.spacing(2),
        width: '100%',
        'z-index': '1000',
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
    },
    hiddenSearchBlock: {
        maxHeight: 0,
        opacity: 0,
    },
    locationBlock: {
        height: '100%',
        maxHeight: '100%',
        opacity: 1,
    },
}))

interface StylesProps {
    isMobile: boolean
    isLocationAccessAnsweredByUser: boolean
}
export const useStoreListStyles = makeStyles((theme: Theme) => ({
    loader: stepScreen(theme).loader,
    selectStoresBlock: {
        position: 'sticky',
        overflowY: 'scroll',
        height: (props: StylesProps) =>
            props.isMobile
                ? props.isLocationAccessAnsweredByUser
                    ? 'auto'
                    : 'calc(100% - 411px)'
                : '100%',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}))
