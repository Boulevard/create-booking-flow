import { useFormikContext } from 'formik'
import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
} from '@mui/material'

export default function QuestionCheckbox({
    question,
    answer = false,
    onchange,
}) {
    const { errors, handleChange, touched } = useFormikContext()
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
                <FormControlLabel
                    label={question.label}
                    control={
                        <Checkbox
                            id={question.id}
                            name={question.id}
                            checked={answer}
                            onChange={(e) => {
                                onchange({
                                    questionId: question.id,
                                    answer: !answer,
                                })
                                handleChange(e)
                            }}
                        />
                    }
                />
            </FormGroup>
            {errors[question.id] && touched[question.id] && (
                <FormHelperText>{errors[question.id]}</FormHelperText>
            )}
        </FormControl>
    )
}
