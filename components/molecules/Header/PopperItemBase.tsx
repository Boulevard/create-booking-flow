import { useStyles } from 'components/molecules/Header/useStyles'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { Box, Typography } from '@mui/material'
import Color from 'config/colors.json'
import React from 'react'

interface Props {
    handleClose: () => void
    step: Step
    icon: React.ReactNode
    text: string
    editable: boolean
}

export const PopperItemBase = ({handleClose, step, icon, text, editable}: Props) => {
    const classes = useStyles()
    const { setStep } = useFlowStep()

    const onEdit = async () => {
        handleClose()
        await setStep(step)
    }
    return (
        <Box
            className={classes.boxWrapperCommon}
            sx={{
                pb: 1,
            }}
        >
            <Box>
                <Typography
                    sx={{ pr: 2 }}
                    variant="body2"
                    component="span"
                >
                    {icon}
                </Typography>
                <Typography component="span">
                    {text}
                </Typography>
            </Box>
            {editable && <Box onClick={onEdit} sx={{cursor: 'pointer'}}>
                <Typography sx={{color: Color.primary.main}}>
                    Edit
                </Typography>
            </Box>}
        </Box>
    )
}
