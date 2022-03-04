import { Box } from '@mui/material'
import { Location } from 'components/atoms/layout/summary/Location'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { Services } from 'components/atoms/layout/summary/Services'
import { PersonalInfo } from 'components/atoms/layout/summary/PersonalInfo'

export const LeftSummary = () => {
    const { currentFlowStep } = useFlowStep()

    if (currentFlowStep.step === Step.ChooseLocation) {
        return <></>
    }

    return (
        <Box>
            <Location />
            <Services />
            <PersonalInfo />
        </Box>
    )
}
