import { useMobile } from 'lib/utils/useMobile'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { BackHeader } from 'components/atoms/layout/mobile/BackHeader'
import { MobileSelectedServiceSelector } from 'components/molecules/MobileSelectedServiceSelector'
import React from 'react'

export const MobileRightSection = () => {
    const { isMobile } = useMobile()
    const { setStep } = useFlowStep()

    const onBackHeaderClick = async () => {
        await setStep(Step.SelectService)
    }

    if (!isMobile) {
        return <></>
    }

    return (
        <>
            <BackHeader caption="Select and manage options" onClick={onBackHeaderClick} />
            <MobileSelectedServiceSelector />
        </>
    )
}
