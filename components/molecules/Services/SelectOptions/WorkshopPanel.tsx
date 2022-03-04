import { useMobile } from 'lib/utils/useMobile'
import { useContext, useEffect } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { useSelectedServices } from 'lib/state/services'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { useCartMethods } from 'lib/state/cart'

export const WorkshopPanel = () => {
    const { isMobile } = useMobile()
    const layout = useContext(LayoutContext)
    const { selectedServicesStateValue } = useSelectedServices()
    const { setStep } = useFlowStep()
    const { isCartAvailableBookableItem } = useCartMethods()
    const servicesCount = selectedServicesStateValue.filter(x=>isCartAvailableBookableItem(x.item)).length

    useEffect(() => {
        layout.setHideLeftPanel(isMobile)
        if (selectedServicesStateValue.length === 0) {
            setStep(Step.SelectService).finally() //noop
        }
        // eslint-disable-next-line
    }, [isMobile])

    useEffect(() => {
        if (selectedServicesStateValue.length > 0 && servicesCount === 0) {
            setStep(Step.SelectedServices).finally() //noop
        }
        // eslint-disable-next-line
    }, [selectedServicesStateValue])
    return <></>
}
