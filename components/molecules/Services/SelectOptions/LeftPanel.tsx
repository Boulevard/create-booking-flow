import { useSelectedServicesScreenStyles } from 'components/molecules/Services/SelectOptions/useStyles'
import { Box } from '@mui/material'
import { SelectedServices } from 'components/molecules/Services/SelectedServices/SelectedServices'
import React from 'react'

export const LeftPanel = () => {
    const classes = useSelectedServicesScreenStyles()
    return (
        <Box className={classes.servicesRoot}>
            <SelectedServices />
        </Box>
    )
}
