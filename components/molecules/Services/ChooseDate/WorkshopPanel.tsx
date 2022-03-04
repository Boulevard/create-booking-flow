import { useContext, useEffect } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { useSelectedStaffTimeState } from 'lib/state/staffTime'
import { Step } from 'lib/state/booking-flow/types'
import { ErrorType } from 'lib/state/error/enums'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { useErrorMessageType } from 'lib/state/error'
import { useCartStoreState } from 'lib/state/store'
import { useFlowStep } from 'lib/state/booking-flow'

export const WorkshopPanel = () => {
    const selectedStaffTime = useSelectedStaffTimeState()
    const layout = useContext(LayoutContext)
    const { reserveBookableTime } = useCartMethods()
    const [, setErrorMessageType] = useErrorMessageType()
    const cartStoreState = useCartStoreState()
    const cart = useCartState()
    const { setStep } = useFlowStep()

    const onReserveBookableTime = async () => {
        layout.setIsShowLoader(true)
        try {
            await reserveBookableTime(
                cart,
                selectedStaffTime?.cartBookableTime,
                cartStoreState
            )
            await setStep(Step.PersonalInfo)
        } catch (e) {
            layout.setIsShowLoader(false)
            if ((e as Error).message.indexOf('CART_TIME_NOT_AVAILABLE') >= 0) {
                setErrorMessageType(ErrorType.TimeIsNoLongerAvailable)
            } else {
                setErrorMessageType(ErrorType.SomethingWentWrong)
            }
        } finally {
            layout.setIsShowLoader(false)
        }
    }


    useEffect(() => {
        layout.setShowBottom(selectedStaffTime !== undefined)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        layout.setOnRightPanelBtnClick(async () => {
            await onReserveBookableTime()
        })
        // eslint-disable-next-line
    }, [selectedStaffTime])
    return <></>
}
