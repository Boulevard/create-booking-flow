import { useStyles } from 'components/molecules/Header/useStyles'
import { Box, Typography } from '@mui/material'
import { Cross } from 'components/icons/Cross'

interface Props {
    handleClose: () => void
}

export const PopperTopRow = ({handleClose}: Props) => {
    const classes = useStyles()

    return (
        <Box
            className={classes.boxWrapperCommon}
            sx={{
                pb: 3,
            }}
        >
            <Typography sx={{
                fontWeight: 700
            }}>Cart</Typography>
            <Box onClick={handleClose} sx={{cursor: 'pointer'}}><Cross/></Box>
        </Box>
    )
}
