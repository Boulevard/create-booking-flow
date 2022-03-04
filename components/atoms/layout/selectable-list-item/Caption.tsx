import { Box, Typography } from '@mui/material'
import { useStyles } from 'components/atoms/layout/selectable-list-item/useStyles'
import { useMobile } from 'lib/utils/useMobile'

interface Props {
    name: string
    durationText?: string
}

export const Caption = ({ name, durationText }: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    return (
        <Box className={classes.row}>
            <Box className={classes.cardItemName}>
                {name}
                {isMobile && 
                    <Typography component="span" fontSize="16px">
                        {` ${durationText}`}
                    </Typography>
                }
            </Box>
            {!isMobile && <Box className={classes.durationText}>{durationText}</Box>}
        </Box>
    )
}
