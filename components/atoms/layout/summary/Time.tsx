import React from 'react'
import { Typography } from '@mui/material'
import { Calendar } from 'components/icons'
import { SummaryItem } from 'components/atoms/layout/summary/SummaryItem'
import { useMobile } from 'lib/utils/useMobile'
import formatDateFns, { cartTimeToDate } from 'lib/utils/formatDateFns'
import { useCartState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'

export const Time = () => {
    const { currentFlowStep } = useFlowStep()
    const { isMobile } = useMobile()
    const cartState = useCartState()
    const store = useCartStoreState()
    const startTime = cartState?.startTime

    if (
        !startTime ||
        (currentFlowStep.step !== Step.PersonalInfo &&
            currentFlowStep.step !== Step.PayAndConfirm)
    ) {
        return <></>
    }

    return (
        <SummaryItem
            isEditable={true}
            step={Step.ChooseDate}
            textHtml={
                <>
                    <Typography variant="h4" component="span">
                        {formatDateFns(
                            cartTimeToDate(startTime),
                            store?.location.tz,
                            `${!isMobile ? 'EEEE' : 'EEE'} MM/dd/yyyy`
                        )}
                    </Typography>
                    <Typography variant="body1" component="span">
                        {' '}
                        at{' '}
                    </Typography>
                    <Typography variant="h4" component="span">
                        {formatDateFns(
                            cartTimeToDate(startTime),
                            store?.location.tz,
                            "h:mmaaaaa'm' "
                        )}
                    </Typography>
                </>
            }
        />
    )
}
