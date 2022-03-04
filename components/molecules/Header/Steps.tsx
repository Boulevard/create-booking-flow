import { Typography } from '@mui/material'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { useHeader } from 'components/molecules/Header/useHeader'

export const Steps = () => {
    const { currentFlowStep } = useFlowStep()
    const { getCurrentStepPercents } = useHeader()
    return (
        <>
            {currentFlowStep.step !== Step.ChooseLocation &&
                currentFlowStep.step !== Step.BookingSuccess &&
                currentFlowStep.step !== Step.LoadingStep && (
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 400,
                            textTransform: 'uppercase',
                        }}
                    >{`step ${
                        getCurrentStepPercents().currentStep
                    } of 5`}</Typography>
                )}
        </>
    )
}
