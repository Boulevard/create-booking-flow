import { useFormikContext } from 'formik'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Grid,
} from '@mui/material'

export default function QuestionSelect({ question, answer, onchange }) {
    const { errors, handleChange, touched } = useFormikContext()
    return (
        <Grid item md={6} sm={12} xs={12}>
            <FormControl
                error={errors[question.id] && touched[question.id]}
                fullWidth
            >
                <InputLabel htmlFor={question.id}>
                    {question.label}
                    {question.required && '*'}
                </InputLabel>
                <Select
                    id={question.id}
                    value={answer?.id ?? ''}
                    name={question.id}
                    placeholder="Select an option"
                    onChange={(e) => {
                        onchange({
                            questionId: question.id,
                            answer: question.options.find(
                                (x) => x.id == e.target.value
                            ),
                        })
                        handleChange(e)
                    }}
                >
                    <MenuItem />
                    {question.options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                {errors[question.id] && touched[question.id] && (
                    <FormHelperText>{errors[question.id]}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    )
}
