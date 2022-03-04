import { Box, Typography } from '@mui/material'
import { useBackHeaderStyles } from 'components/atoms/layout/mobile/useStyles'
import { ArrowLeft } from 'components/icons/ArrowLeft'

interface Props {
    onClick: () => void
    caption: string
}

export const BackHeader = ({ onClick, caption }: Props) => {
    const classes = useBackHeaderStyles()
    return (
        <Box className={classes.block} onClick={onClick}>
            <Box className={classes.row}>
                <Box className={classes.arrow}>
                    <ArrowLeft color="black" />
                </Box>
                <Typography variant="h6">{caption}</Typography>
            </Box>
        </Box>
    )
}
