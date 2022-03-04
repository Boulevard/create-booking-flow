import * as Yup from 'yup'
import { Cart } from '@boulevard/blvd-book-sdk/lib/cart'
import { BookingAnswer } from 'lib/state/booking-answers/types'

export const getBookingQuestionsInitialValues = (
    cart: Cart | undefined,
    bookingAnswers: BookingAnswer[]
) => {
    let initialValuesObject = {}

    const bookingQuestions = cart?.bookingQuestions.map((question) => {
        return {
            id: question.id,
            required: question.required,
        }
    })
    if (bookingQuestions) {
        for (let bq of bookingQuestions) {
            if (bq.required) {
                initialValuesObject[bq.id] = ''
            }
        }
    }

    for (let bookingAnswer of bookingAnswers) {
        initialValuesObject[bookingAnswer.questionId] = bookingAnswer.answer
    }
    return initialValuesObject
}

export const getBookingQuestionsValidationSchema = (cart: Cart | undefined) => {
    let validationSchemaObject = {}

    const bookingQuestions = cart?.bookingQuestions.map((question) => {
        return {
            id: question.id,
            required: question.required,
        }
    })
    if (bookingQuestions) {
        for (let bq of bookingQuestions) {
            if (bq.required) {
                validationSchemaObject[bq.id] = Yup.mixed().required('Required')
            }
        }
    }
    return validationSchemaObject
}
