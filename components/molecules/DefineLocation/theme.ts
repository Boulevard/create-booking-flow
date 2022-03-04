import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
    width: 48,
    height: 40,
    border: 'none',
    backgroundColor: theme.palette.primary.main,
    marginLeft: '12px',
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 48,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '& svg path': {
        stroke: theme.palette.primary.contrastText,
    },
}))
