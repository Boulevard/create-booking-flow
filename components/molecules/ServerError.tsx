import { Typography, Box, Button } from '@mui/material'
import { theme } from 'styles/theme'
import { useErrorMessageType } from 'lib/state/error'
import { ErrorType } from 'lib/state/error/enums'
import { useResetStaffDatesStore } from 'lib/state/staffDate'
import { useResetStaffTimesState, useStaffTimes } from 'lib/state/staffTime'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { useCartState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import { useMobile } from 'lib/utils/useMobile'

export default function ServerError() {
    const { isMobile } = useMobile()
    const [errorMessageType, setErrorMessageType] = useErrorMessageType()
    const resetStaffDatesStore = useResetStaffDatesStore()
    const resetStaffTimesState = useResetStaffTimesState()
    const { loadDatesAndTimes } = useStaffTimes()
    const { setStep } = useFlowStep()
    const cart = useCartState()
    const store = useCartStoreState()

    const selectNewTime = async () => {
        resetStaffDatesStore()
        resetStaffTimesState()
        setTimeout(async () => {
            await loadDatesAndTimes(cart!, store?.location!, new Date())
            setErrorMessageType(ErrorType.NoError)
            await setStep(Step.ChooseDate)
        }, 400)
    }

    const onContinue = async () => {
        if (errorMessageType === ErrorType.TimeIsNoLongerAvailable) {
            selectNewTime()
        } else {
            setErrorMessageType(ErrorType.NoError)
        }
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                top: !isMobile ? '46%' : '40%',
                textAlign: 'center',
                padding: theme.spacing(0, 2),
            }}
        >
            <Typography variant="h2" sx={{ pb: 2 }}>
                {errorMessageType === ErrorType.TimeIsNoLongerAvailable &&
                    'Sorry, that time has already been booked'}
                {errorMessageType === ErrorType.SomethingWentWrong &&
                    'Our apologies, but something went wrong booking that appointment'}
            </Typography>
            <Typography sx={{ pb: 5, fontSize: 16 }}>
                {errorMessageType === ErrorType.TimeIsNoLongerAvailable &&
                    'Please try again by selecting a new date and/or time.'}
                {errorMessageType === ErrorType.SomethingWentWrong &&
                    'Please try again.'}
            </Typography>
            <Button
                onClick={onContinue}
                sx={{
                    width: 178,
                    height: 38,
                    borderColor: '#C3C7CF',
                    color: '#33343C',
                    textTransform: 'capitalize',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    border: '1px solid #C3C7CF',
                    backgroundColor: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#F9F9FB',
                    },
                }}
            >
                {errorMessageType === ErrorType.TimeIsNoLongerAvailable
                    ? 'Select a new date/time'
                    : 'Try again'}
            </Button>
        </Box>
    )
}
