import React from 'react'
import { Typography } from '@mui/material'
import { usePersonalInformationState } from 'lib/state/personal-info'
import { Step } from 'lib/state/booking-flow/types'
import { SummaryItemBase } from 'components/atoms/layout/summary/SummaryItemBase'
import { useFlowStep } from 'lib/state/booking-flow'

export const PersonalInfo = () => {
    const { currentFlowStep } = useFlowStep()
    const [personalInformation] = usePersonalInformationState()

    if (
        (!personalInformation.firstName && !personalInformation.lastName) ||
        currentFlowStep.step !== Step.PayAndConfirm
    ) {
        return <></>
    }

    return (
        <SummaryItemBase isEditable={true} step={Step.PersonalInfo}>
            <Typography variant="body1">
                {`${personalInformation.firstName} ${personalInformation.lastName}`}
            </Typography>
        </SummaryItemBase>
    )
}
