import { Box, LinearProgress } from '@mui/material'
import { useHeader } from 'components/molecules/Header/useHeader'

export const Progress = () => {
    const { getCurrentStepPercents } = useHeader()
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress
                variant="determinate"
                value={getCurrentStepPercents().currentStepByPercent}
            />
        </Box>
    )
}
