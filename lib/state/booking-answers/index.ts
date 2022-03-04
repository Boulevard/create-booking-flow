import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { BookingAnswer } from './types'

const bookingAnswersState = atom<Array<BookingAnswer>>({
    key: 'bookingAnswersState',
    default: [],
})

export const useBookingAnswersState = () => useRecoilState(bookingAnswersState)
export const useBookingAnswers = () => useRecoilValue(bookingAnswersState)
export const useSetBookingAnswersState = () =>
    useSetRecoilState(bookingAnswersState)
