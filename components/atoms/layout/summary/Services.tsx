import React from 'react'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import {
    useSelectedServices,
    useSetActiveSelectedService,
} from 'lib/state/services'
import { WithService } from 'components/molecules/Services/SelectedServices/WithService'
import { SummaryItemBase } from 'components/atoms/layout/summary/SummaryItemBase'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { theme } from 'styles/theme'

export const Services = () => {
    const { currentFlowStep } = useFlowStep()
    const { selectedServicesStateValue, reverseSelectedServices } =
        useSelectedServices()
    const reversedList = reverseSelectedServices(selectedServicesStateValue)
    const setActiveSelectedService = useSetActiveSelectedService()

    if (
        currentFlowStep.step !== Step.ChooseDate &&
        currentFlowStep.step !== Step.PersonalInfo &&
        currentFlowStep.step !== Step.PayAndConfirm
    ) {
        return <></>
    }
    const onEdit = (bookableItem: CartBookableItem) => {
        setActiveSelectedService(bookableItem)
    }
    return (
        <>
            {reversedList?.map((bookableItem: CartBookableItem) => (
                <SummaryItemBase
                    key={bookableItem.id}
                    padding={theme.spacing(0)}
                    step={Step.SelectedServices}
                    onEdit={() => onEdit(bookableItem)}
                    isEditable={true}
                >
                    <WithService
                        isReadMode={true}
                        hideBorderBottom={true}
                        bookableItem={bookableItem}
                    />
                </SummaryItemBase>
            ))}
        </>
    )
}
