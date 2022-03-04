import { Typography } from '@mui/material'
import { useCartState } from 'lib/state/cart'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { format as formatFn, toDate } from 'date-fns-tz'
import { useCartStoreState } from 'lib/state/store'
import { useStaffTimes } from 'lib/state/staffTime'

export const SelectedTime = () => {
    const { setStep } = useFlowStep()
    const cart = useCartState()
    const store = useCartStoreState()
    const { loadDatesAndTimes } = useStaffTimes()
    const bookedTime = cart?.startTime
        ? `at ${formatFn(toDate(cart?.startTime), 'h:mmaaa')}`
        : ''

    const onStepClick = async () => {
        await loadDatesAndTimes(cart!, store?.location!, new Date())
        await setStep(Step.ChooseDate)
    }

    if (!cart?.startTime) {
        return null
    }

    return (
        <Typography
            onClick={onStepClick}
            variant="subtitle2"
            sx={{
                pl: '3px',
                cursor: 'pointer',
                fontWeight: '400'
            }}
        >
            {bookedTime}
        </Typography>
    )
}
