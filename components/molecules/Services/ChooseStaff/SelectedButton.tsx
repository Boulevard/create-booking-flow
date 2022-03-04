import { Box, Typography } from '@mui/material'
import { colors } from 'constants/colors'
import React from 'react'
import { useSelectedButton } from 'components/molecules/Services/ChooseStaff/useStyles'
import { Checked } from 'components/icons/Checked'
import { useMobile } from 'lib/utils/useMobile'

export const SelectedButton = () => {
    const { isMobile } = useMobile()
    const classes = useSelectedButton({ isMobile })
    return (
        <Box className={classes.selectedWrapper}>
            <Box className={classes.svgWrapper}>
                <Box className={classes.btn}>
                    <Checked color={colors.primary.main} />
                </Box>
            </Box>
            <Typography className={classes.selectedTxt}> Selected </Typography>
        </Box>
    )
}
