import { useFormikContext } from 'formik'
import { TextField } from '@mui/material'

export default function QuestionShortText({ question, answer = '', onchange }) {
    const { errors, handleChange, touched } = useFormikContext()
    return (
        <TextField
            id={question.id}
            label={`${question.label}${question.required && '*'}`}
            value={answer}
            onChange={(e) => {
                onchange({
                    questionId: question.id,
                    answer: e.target.value,
                })
                handleChange(e)
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
