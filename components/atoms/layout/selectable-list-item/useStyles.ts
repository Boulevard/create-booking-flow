import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

interface StylesProps {
    isMobile: boolean
}

export const useStyles = makeStyles((theme: Theme) => ({
    cardItemPrice: {
        display: 'inline-block',
        textTransform: 'lowercase',
        fontSize: '14px',
        fontWeight: 'bold',
        '&:first-letter': {
            textTransform: 'uppercase',
        },
    },

    selectBtnWrapper: {
        marginLeft: (props: StylesProps) => (props.isMobile ? '0px' : 'auto'),
        marginRight: (props: StylesProps) => (props.isMobile ? '0px' : '32px'),
    },

    selectBtn: {
        height: 38,
        marginTop: theme.spacing(2),
        fontSize: '16px',
        fontWeight: 500,
        textTransform: 'none',
    },

    cardItemDescBlock: {
        paddingTop: '14px',
        marginBottom: '20px',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
    },

    cardItemName: {
        marginRight: '5px',
    },

    durationText: {
        fontSize: '13px',
        marginLeft: '5px',
    },
}))
