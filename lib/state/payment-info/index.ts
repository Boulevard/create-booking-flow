import {
    atom,
    useRecoilState,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import { PaymentInformation } from './types'

const paymentInformationState = atom<PaymentInformation>({
    key: 'paymentInformationState',
    default: {
        cardHoldersName: '',
        cardNumber: '',
        expirationDate: '',
    },
})

export const usePaymentInformationState = () =>
    useRecoilState(paymentInformationState)
export const useSetPaymentInformationState = () =>
    useSetRecoilState(paymentInformationState)
export const useResetPaymentInformationState = () =>
    useResetRecoilState(paymentInformationState)
