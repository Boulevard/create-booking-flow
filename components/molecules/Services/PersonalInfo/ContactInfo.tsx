import React from 'react'
import { Box, Typography } from '@mui/material'
import EmailPhone from 'components/molecules/Services/PersonalInfo/EmailPhone'

export default function ContactInfo() {
    return (
        <Box sx={{ pt: 5 }}>
            <Typography variant="h3" sx={{ pb: 1 }}>
                Contact info
            </Typography>
            <EmailPhone />
        </Box>
    )
}
