import { useBookingAnswersState } from 'lib/state/booking-answers'
import { BookingAnswer } from 'lib/state/booking-answers/types'
import QuestionCheckbox from './QuestionCheckbox'
import QuestionDatetime from './QuestionDatetime'
import QuestionFloat from './QuestionFloat'
import QuestionInteger from './QuestionInteger'
import QuestionLongText from './QuestionLongText'
import QuestionMultiselect from './QuestionMultiselect'
import QuestionSelect from './QuestionSelect'
import QuestionShortText from './QuestionShortText'
import { CartBookingQuestionDisplayType } from 'components/molecules/Services/PersonalInfo/Questions/CartBookingQuestionDisplayType'

interface Props {
    question: any
}

export default function QuestionElement({ question }: Props) {
    const [bookingAnswers, setBookingAnswers] = useBookingAnswersState()
    const bookingAnswersState = bookingAnswers.find(
        (q) => q.questionId === question.id
    )
    const answer = bookingAnswersState?.answer

    const handleChange = (answer: BookingAnswer) => {
        setBookingAnswers([
            ...bookingAnswers.filter((q) => q.questionId !== answer.questionId),
            answer,
        ])
    }

    return (
        <div>
            {question.displayType ===
                CartBookingQuestionDisplayType.Boolean && (
                <QuestionCheckbox
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
            {question.displayType ===
                CartBookingQuestionDisplayType.Datetime && (
                <QuestionDatetime
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
            {question.displayType === CartBookingQuestionDisplayType.Float && (
                <QuestionFloat
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
            {question.displayType ===
                CartBookingQuestionDisplayType.Integer && (
                <QuestionInteger
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
            {question.displayType ===
                CartBookingQuestionDisplayType.LongText && (
                <QuestionLongText
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
            {question.displayType ===
                CartBookingQuestionDisplayType.Multiselect && (
                <QuestionMultiselect
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
            {question.displayType === CartBookingQuestionDisplayType.Select && (
                <>
                    <QuestionSelect
                        answer={answer}
                        question={question}
                        onchange={handleChange}
                    />
                </>
            )}
            {question.displayType ===
                CartBookingQuestionDisplayType.ShortText && (
                <QuestionShortText
                    answer={answer}
                    question={question}
                    onchange={handleChange}
                />
            )}
        </div>
    )
}
