import { OptionsList } from 'components/molecules/Services/SelectOptions/OptionsList'
import React from 'react'
import { MobileRightSection } from 'components/molecules/Services/SelectOptions/MobileRightSection'
import { MobileAddAnotherService } from 'components/molecules/Services/SelectedServices/MobileAddAnotherService'

export const RightPanel = () => {
    return (
        <>
            <MobileRightSection />
            <OptionsList />
            <MobileAddAnotherService allowRemoveService={true} />
        </>
    )
}
