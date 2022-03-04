import React from 'react'
import { Box } from '@mui/material'
import BounceLoader from 'react-spinners/BounceLoader'

export default function LoadingStepBlock() {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: 'calc(50% - 30px)',
                top: 'calc(50% - 30px)',
            }}
        >
            <BounceLoader color="#dadada" size={60} />
        </Box>
    )
}
