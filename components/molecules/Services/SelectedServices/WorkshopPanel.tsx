import { useMobile } from 'lib/utils/useMobile'
import { useContext, useEffect } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { useSelectedServices } from 'lib/state/services'
import { useCartBookableItemListStaff } from 'lib/state/staff'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import { useStaffTimes } from 'lib/state/staffTime'

export const WorkshopPanel = () => {
    const { isMobile } = useMobile()
    const layout = useContext(LayoutContext)
    const { selectedServicesStateValue } = useSelectedServices()
    const cartBookableItemListStaff = useCartBookableItemListStaff()
    const { setStep } = useFlowStep()
    const { isCartAvailableBookableItem } = useCartMethods()
    const cart = useCartState()
    const store = useCartStoreState()
    const { loadDatesAndTimes } = useStaffTimes()

    const getShowBottom = () => {
        return (
            selectedServicesStateValue
                .filter(x=>isCartAvailableBookableItem(x.item))
                .map((x) =>
                    cartBookableItemListStaff?.find(
                        (s) => s.cartBookableItemId === x.id
                    )
                )
                .filter((x) => x === undefined).length === 0
        )
    }

    const onRightPanelBtnClick = async () => {
        layout.setIsShowLoader(true)
        try {
            const servicesCount = selectedServicesStateValue.filter(x=>isCartAvailableBookableItem(x.item)).length
            if (servicesCount > 0) {
                await loadDatesAndTimes(cart!, store?.location!, new Date())
                await setStep(Step.ChooseDate)
            } else {
                await setStep(Step.PersonalInfo)
            }
        } finally {
            layout.setIsShowLoader(false)
        }
    }

    useEffect(() => {
        if (selectedServicesStateValue.length === 0) {
            setStep(Step.SelectService).finally() //noop
            return
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        layout.setHideLeftPanel(isMobile)
        const showBottom = getShowBottom()
        layout.setShowBottom(showBottom)
        layout.setShowLeftBottom(showBottom)
        layout.setOnRightPanelBtnClick(onRightPanelBtnClick)
        // eslint-disable-next-line
    }, [isMobile, selectedServicesStateValue])
    return <></>
}
