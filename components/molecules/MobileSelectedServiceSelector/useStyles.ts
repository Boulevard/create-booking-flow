import { createStyles, makeStyles, withStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { colors } from 'constants/colors'
import MenuItem from '@mui/material/MenuItem'

export const CustomMenuItem = withStyles(() =>
    createStyles({
        root: {
            height: '72px',
            fontSize: '16px',
        },
    })
)(MenuItem)

export const useStyles = makeStyles((theme: Theme) => ({
    block: {
        padding: theme.spacing(2, 2),
        cursor: 'pointer',
        borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    arrow: {
        marginRight: '20px',
    },
    itemName: {
        fontSize: '16px',
    },
    formControl: {
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: 'white',
        },
    },
    selectRoot: {
        fontSize: '16px',
        fontWeight: 700,
        borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        },
        '&:focus-within .MuiSelect-standard': {
            backgroundColor: 'white',
        },
        '& .MuiInput-input': {
            paddingLeft: '16px',
            lineHeight: '66px',
        },
    },

    icon: {
        fill: `${colors.primary.main}`,
        marginRight: '10px',
    },
}))
