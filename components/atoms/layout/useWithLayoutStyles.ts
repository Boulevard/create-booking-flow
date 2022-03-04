import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { stepScreen } from 'constants/styles'
import Font from 'config/fonts.json'

interface StylesProps {
    isMobile: boolean
}

export const useWithLayoutStyles = makeStyles((theme: Theme) => ({
    root: {
        height: (props: StylesProps) => (!props.isMobile ? '100%' : 'auto'),
        marginTop: (props: StylesProps) => (!props.isMobile ? '0' : '46px'),
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    grid: {
        height: (props: StylesProps) => (!props.isMobile ? '100%' : 'auto'),
        display: (props: StylesProps) => (!props.isMobile ? 'flex' : 'block'),
    },
    left: {
        height: (props: StylesProps) => (!props.isMobile ? '100%' : 'auto'),
        flex: '0 0 500px',
        display: 'flex',
        flexDirection: 'column',
    },
    right: {
        flex: '1 0 400px',
        borderLeft: (props: StylesProps) =>
            !props.isMobile ? '1px solid #D9DDE6' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    rightPanelCaption: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '58px',
        minHeight: '58px',
        borderBottom: '2px solid rgb(217, 221, 229)',
        paddingLeft: (props: StylesProps) =>
            !props.isMobile ? theme.spacing(4) : theme.spacing(2),
    },
    rightPanelCaptionIcon: {
        paddingRight: theme.spacing(2),
    },
    rightPanelCaptionText: {
        fontFamily: Font.headings_family,
        fontWeight: 500,
        fontSize: '20px',
        color: '#000000E5',
        lineHeight: '24px',
    },
    rightPanelBottom: {
        zIndex: 1000,
        height: '56px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: (props: StylesProps) =>
            !props.isMobile ? 'relative' : 'fixed',
        bottom: 0,
    },
    rightPanelBottomBtn: {
        width: '100%',
        height: '56px',
        borderRadius: 0,
        fontSize: '16px',
        fontWeight: 500,
        textTransform: 'none',
    },
    leftPanelBottom: {
        height: '62px',
        display: 'flex',
    },
    leftPanelBottomBtn: {
        fontSize: '16px',
        fontWeight: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    loader: stepScreen(theme).loader,
    blurScreen: stepScreen(theme).blurScreen,
}))
