import React from 'react'
import { Box, Typography } from '@mui/material'
import FirstLastName from 'components/molecules/Services/PersonalInfo/FirstLastName'

export default function BasicInfo() {
    return (
        <Box>
            <Typography variant="h3" sx={{ pb: 1 }}>
                Basic info
            </Typography>
            <FirstLastName />
        </Box>
    )
}
