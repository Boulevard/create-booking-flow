import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useBackHeaderStyles = makeStyles((theme: Theme) => ({
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
}))
