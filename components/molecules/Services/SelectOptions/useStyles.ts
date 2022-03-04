import { makeStyles } from '@mui/styles'

interface StylesProps {
    isMobile: boolean
}

export const useOptionsListStyles = makeStyles(() => ({
    root: {
        overflowY: 'scroll',
        position: 'sticky',
        height: 'calc(100% - 57px)',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    noOptionsAvailableWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15%',
    },
}))

export const useSelectedServicesScreenStyles = makeStyles(() => ({
    servicesRoot: {
        paddingTop: '1px',
        paddingBottom: '1px',
        height: 'calc(100% - 55px)',
    },
}))

export const useOption = makeStyles(() => ({
    cardItemPrice: {
        display: 'inline-block',
        textTransform: 'lowercase',
        fontSize: '14px',
        fontWeight: 'bold',
        '&:first-letter': {
            textTransform: 'uppercase',
        },
    },
}))

export const useSelectedButton = makeStyles(() => ({
    selectedWrapper: {
        marginLeft: (props: StylesProps) => (props.isMobile ? '0px' : 'auto'),
        marginRight: '32px',
        marginTop: (props: StylesProps) => (props.isMobile ? '21px' : '32px'),
        display: 'flex',
        flexDirection: 'row',
    },
    selectedTxt: {
        fontWeight: 700,
        fontSize: '14px',
        marginRight: '15px',
    },

    svgWrapper: {
        marginTop: '-3px',
        marginLeft: (props: StylesProps) => (props.isMobile ? 'auto' : '0px'),
    },

    btn: {
        cursor: 'pointer',
    },
}))
