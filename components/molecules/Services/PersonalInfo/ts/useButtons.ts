import { useContext } from 'react'
import { FormikValues } from 'formik'
import { Step } from 'lib/state/booking-flow/types'
import { useCartState } from 'lib/state/cart'
import { useFlowStep } from 'lib/state/booking-flow'
import { useBookingAnswers } from 'lib/state/booking-answers'
import { usePersonalInformationState } from 'lib/state/personal-info'
import { CartBookingQuestionDisplayType } from 'components/molecules/Services/PersonalInfo/Questions/CartBookingQuestionDisplayType'
import { useUrlParams } from 'lib/sdk/hooks/useUrlParams'
import { useErrorMessageType } from 'lib/state/error'
import { ErrorType } from 'lib/state/error/enums'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

export const useButtons = () => {
    const layout = useContext(LayoutContext)
    const { setStep } = useFlowStep()
    const cart = useCartState()
    const [, setPersonalInformation] = usePersonalInformationState()
    const bookingAnswers = useBookingAnswers()
    const [, setErrorMessageType] = useErrorMessageType()
    const { getUrlParams } = useUrlParams()

    const getFieldOrUndefined = (value: string | undefined) => {
        let result: string | undefined
        if (value?.length && value.length > 0) {
            result = value
        }
        return result
    }

    const onContinue = async (values: FormikValues) => {
        layout.setIsShowLoader(true)
        try {
            layout.setIsShowLoader(true)

            let phone: string | undefined
            if (values?.phone?.length && values.phone.length > 0) {
                phone = values.phone.startsWith('+')
                    ? values.phone
                    : `+1${values.phone}`
            }

            let updatedCart = await cart?.update({
                referralSource: getUrlParams().ref,
                clientInformation: {
                    externalId: getUrlParams().shopperId,
                    email: getFieldOrUndefined(values?.email),
                    firstName: getFieldOrUndefined(values?.firstName),
                    lastName: getFieldOrUndefined(values?.lastName),
                    phoneNumber: phone?.replace(/[-_ ()]/g, ''),
                },
            })

            const bookingQuestions = updatedCart?.bookingQuestions
            const answers = bookingAnswers.concat()

            // for CartBookingQuestionDisplayType.Select if user hasn't chosen answer explicitly - set first option as answer
            if (bookingQuestions && answers) {
                for (let bookingQuestion of bookingQuestions.filter(
                    (x) =>
                        x.displayType ===
                            CartBookingQuestionDisplayType.Select &&
                        x.options.length > 0 &&
                        x.required
                )) {
                    const answer = answers.find(
                        (x) => x.questionId == bookingQuestion.id
                    )
                    if (answer == undefined) {
                        answers.push({
                            questionId: bookingQuestion.id,
                            answer: bookingQuestion.options[0],
                        })
                    }
                }

                for (let bookingAnswer of answers) {
                    const bookingQuestion = bookingQuestions.find(
                        (x) => x.id == bookingAnswer.questionId
                    )
                    if (bookingQuestion && bookingAnswer.answer) {
                        updatedCart = await bookingQuestion.submitAnswer(
                            bookingAnswer.answer
                        )
                    }
                }
            }

            await setPersonalInformation({
                email: getFieldOrUndefined(values?.email)!,
                firstName: getFieldOrUndefined(values?.firstName)!,
                lastName: getFieldOrUndefined(values?.lastName)!,
                phone: values.phone,
            })
            setErrorMessageType(ErrorType.NoError)
            await setStep(Step.PayAndConfirm)
        } catch {
            layout.setIsShowLoader(false)
        }
    }

    const onMoveBack = async () => {
        await setStep(Step.ChooseDate)
    }

    return {
        onContinue: onContinue,
        onMoveBack: onMoveBack,
        isFormSubmitting: layout.isShowLoader,
    }
}
