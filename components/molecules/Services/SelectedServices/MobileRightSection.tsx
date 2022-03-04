import { useMobile } from 'lib/utils/useMobile'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { BackHeader } from 'components/atoms/layout/mobile/BackHeader'
import { MobileSelectedServiceSelector } from 'components/molecules/MobileSelectedServiceSelector'
import React from 'react'
import { FlowType, useAppConfig } from 'lib/state/config'
import { useSelectedServices } from 'lib/state/services'
import { useCartMethods } from 'lib/state/cart'

export const MobileRightSection = () => {
    const { isMobile } = useMobile()
    const { setStep } = useFlowStep()
    const { getFlowType } = useAppConfig()
    const flowType = getFlowType()
    const { selectedServicesStateValue } = useSelectedServices()
    const {isCartAvailableBookableItem} = useCartMethods()
    const isAnyServiceExist = selectedServicesStateValue.filter(x=>isCartAvailableBookableItem(x.item)).length > 0

    const onBackHeaderClick = async () => {
        const step =
            flowType === FlowType.SelectLocationFirst
                ? Step.SelectService
                : Step.ChooseLocation
        await setStep(step)
    }

    if (!isMobile) {
        return <></>
    }

    return (
        <>
            <BackHeader caption={isAnyServiceExist ? "Select stylist" : 'Select and manage options'} onClick={onBackHeaderClick} />
            <MobileSelectedServiceSelector />
        </>
    )
}
