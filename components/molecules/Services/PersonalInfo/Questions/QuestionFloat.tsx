import { useFormikContext } from 'formik'
import { TextField } from '@mui/material'

export default function QuestionFloat({ question, answer = 0.0, onchange }) {
    const { errors, handleChange, touched } = useFormikContext()
    return (
        <TextField
            id={question.id}
            label={`${question.label}${question.required && '*'}`}
            value={answer}
            onChange={(e) => {
                onchange({
                    questionId: question.id,
                    answer: parseFloat(e.target.value),
                })
                handleChange(e)
            }}
            inputProps={{
                type: 'number',
                maxLength: 13,
                step: '0.01',
            }}
            error={errors[question.id] && touched[question.id]}
            helperText={
                errors[question.id] &&
                touched[question.id] &&
                errors[question.id]
            }
        />
    )
}
