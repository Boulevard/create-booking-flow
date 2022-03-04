import { Box, Typography } from '@mui/material'
import { TrashCan } from 'components/icons/TrashCan'
import { colors } from '../../../../constants/colors'
import React from 'react'
import { useSelectedButton } from 'components/molecules/Services/SelectOptions/useStyles'
import { useMobile } from 'lib/utils/useMobile'

interface Props {
    removeOption: () => void
}

export const SelectedButton = ({ removeOption }: Props) => {
    const { isMobile } = useMobile()
    const classes = useSelectedButton({ isMobile })
    return (
        <Box className={classes.selectedWrapper}>
            <Typography className={classes.selectedTxt}> Selected </Typography>
            <Box className={classes.svgWrapper}>
                <Box onClick={removeOption} className={classes.btn}>
                    <TrashCan color={colors.primary.main} />
                </Box>
            </Box>
        </Box>
    )
}
