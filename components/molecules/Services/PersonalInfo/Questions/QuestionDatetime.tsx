import { useFormikContext } from 'formik'
import DatePicker from '@mui/lab/DatePicker'
import { TextField } from '@mui/material'

export default function QuestionDatetime({ question, answer = '', onchange }) {
    const { handleChange } = useFormikContext()
    return (
        <DatePicker
            label={`${question.label}${question.required && '*'}`}
            openTo="year"
            views={['year', 'month', 'day']}
            value={answer}
            onChange={(date) => {
                onchange({
                    questionId: question.id,
                    answer: date,
                })
                handleChange(date)
            }}
            renderInput={(params) => <TextField {...params} />}
        />
    )
}
