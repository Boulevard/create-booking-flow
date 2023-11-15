import { useContext } from 'react'
import { FormikValues } from 'formik'
import { Step } from 'lib/state/booking-flow/types'
import {
    useCartState,
    useSetCartIdState,
    useSetCartState,
    useSetSuccessBookingCartInfoState,
} from 'lib/state/cart'
import { useFlowStep } from 'lib/state/booking-flow'
import { useSetBookingAnswersState } from 'lib/state/booking-answers'
import { useCartStoreState, useSetCartStoreState } from 'lib/state/store'
import { useErrorMessageType } from 'lib/state/error'
import { ErrorType } from 'lib/state/error/enums'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { Blvd } from 'lib/sdk/blvd'
import { Card } from './types'

export const useButtons = () => {
    const { setStep } = useFlowStep()
    const cart = useCartState()
    const setBookingAnswers = useSetBookingAnswersState()
    const setCart = useSetCartState()
    const setCartIdState = useSetCartIdState()
    const setCartStore = useSetCartStoreState()
    const [, setErrorMessageType] = useErrorMessageType()
    const layout = useContext(LayoutContext)
    const cartStoreState = useCartStoreState()
    const setSuccessBookingCartInfoState = useSetSuccessBookingCartInfoState()

    const getFormatedCardHoldersName = (cardHoldersName: string) => {
        return cardHoldersName.toUpperCase()
    }
    const getFormatedCardNumber = (cardNumber: string) => {
        return cardNumber.replace(/\s+/g, '')
    }
    const getExpirationMonth = (expirationDate: string) => {
        return Number(expirationDate.substring(0, 2))
    }
    const getExpirationYear = (expirationDate: string) => {
        return Number(expirationDate.substring(3, 5))
    }

    const getAddressPostalCode = (addressPostalCode: string) => {
        return addressPostalCode.trim()
    }

    const onContinue = async (values: FormikValues) => {
        layout.setIsShowLoader(true)

        try {
            if (!cart) throw new Error('cart is missing, but required')

            layout.setIsShowLoader(true)
            let icsLink: string = ''
            try {
                const card: Card = {
                    name: getFormatedCardHoldersName(values.cardHoldersName),
                    number: getFormatedCardNumber(values.cardNumber),
                    cvv: values.cvc,
                    exp_month: getExpirationMonth(values.expirationDate),
                    exp_year: getExpirationYear(values.expirationDate),
                    address_postal_code: getAddressPostalCode(
                        values.addressPostalCode
                    ),
                }

                await cart.addCardPaymentMethod({ card })
                const checkoutCartPayload = await cart.checkout()
                if (
                    checkoutCartPayload?.appointments &&
                    checkoutCartPayload?.appointments?.length > 0
                ) {
                    const appointmentId =
                        checkoutCartPayload?.appointments[0].appointmentId
                    const appointment = await Blvd.appointments.getFromCart(
                        appointmentId,
                        cart.id
                    )
                    icsLink = appointment?.calendarLinks?.icsDownload
                }
            } catch (e) {
                if (
                    (e as Error).message.indexOf('CART_TIME_NOT_AVAILABLE') >= 0
                ) {
                    setErrorMessageType(ErrorType.TimeIsNoLongerAvailable)
                } else {
                    setErrorMessageType(ErrorType.SomethingWentWrong)
                }
                return
            } finally {
                layout.setIsShowLoader(false)
            }

            await setSuccessBookingCartInfoState({
                total: cart?.summary.total,
                startTime: cart?.startTime,
                endTime: cart?.endTime,
                store: cartStoreState!,
                icsLink: icsLink,
            })

            setBookingAnswers([])
            setCartStore(undefined)
            setCartIdState(undefined)
            setCart(undefined) //set cart to undefined after saving all data
            setErrorMessageType(ErrorType.NoError)
            await setStep(Step.BookingSuccess)
        } catch {
            layout.setIsShowLoader(false)
        }
    }

    const onMoveBack = async () => {
        await setStep(Step.PersonalInfo)
    }

    return {
        onContinue: onContinue,
        onMoveBack: onMoveBack,
        isFormSubmitting: layout.isShowLoader,
    }
}
