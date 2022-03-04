import { useFormikContext } from 'formik'
import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
} from '@mui/material'
import { CartBookingQuestionOption } from '@boulevard/blvd-book-sdk/lib/carts/bookingQuestions'

export default function QuestionMultiselect({
    question,
    answer = [],
    onchange,
}) {
    const { errors, handleChange, touched } = useFormikContext()
    const answers = answer as Array<CartBookingQuestionOption>

    const preChangeValue = (e) => {
        const optionId = e.target.value
        const option = question.options.find((x) => x.id == optionId)
        handleChange(e)
        onchange({
            questionId: question.id,
            answer:
                answers.filter(
                    (x: CartBookingQuestionOption) => x.id == option.id
                ).length > 0
                    ? [...answers.filter((s) => s.id !== optionId)]
                    : [...answers, option],
        })
    }

    return (
        <FormControl
            component="fieldset"
            error={errors[question.id] && touched[question.id]}
        >
            <FormLabel component="legend">
                {question.label}
                {question.required && '*'}
            </FormLabel>
            <FormGroup>
                {question.options.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        label={option.label}
                        control={
                            <Checkbox
                                id={question.id}
                                name={question.id}
                                value={option.id}
                                checked={
                                    answers.filter(
                                        (x: CartBookingQuestionOption) =>
                                            x.id == option.id
                                    ).length > 0
                                }
                                onChange={preChangeValue}
                            />
                        }
                    />
                ))}
            </FormGroup>
            {errors[question.id] && touched[question.id] && (
                <FormHelperText>{errors[question.id]}</FormHelperText>
            )}
        </FormControl>
    )
}
