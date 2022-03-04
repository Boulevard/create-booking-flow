import { StaffsList } from 'components/molecules/Services/ChooseStaff/StaffsList'
import { MobileRightSection } from 'components/molecules/Services/SelectedServices/MobileRightSection'
import { MobileAddAnotherService } from 'components/molecules/Services/SelectedServices/MobileAddAnotherService'
import { useSelectedServices } from 'lib/state/services'
import { useCartMethods } from 'lib/state/cart'
import { OptionsList } from 'components/molecules/Services/SelectOptions/OptionsList'
import React from 'react'

export const RightPanel = () => {
    const { selectedServicesStateValue } = useSelectedServices()
    const { isCartAvailableBookableItem } = useCartMethods()
    const hasServices = selectedServicesStateValue.filter(x=>isCartAvailableBookableItem(x.item)).length > 0
    return (
        <>
            <MobileRightSection />
            {hasServices && <StaffsList />}
            {!hasServices && <OptionsList />}
            <MobileAddAnotherService
                allowAddAnotherService={true}
                allowEditAddonService={true}
                allowRemoveService={true}
            />
        </>
    )
}
