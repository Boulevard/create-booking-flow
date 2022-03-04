import { useFormikContext } from 'formik'
import { Grid } from '@mui/material'
import TextFieldBase from 'components/atoms/formik/TextFieldBase'
import {
    firstNameFieldName,
    lastNameFieldName,
} from '../PersonalInfo/ts/constants'

export default function FirstLastName() {
    const { errors, touched } = useFormikContext()

    return (
        <Grid item md={6} sm={12} xs={12}>
            <TextFieldBase
                id={firstNameFieldName}
                label="First Name"
                fullWidth
                error={
                    errors[firstNameFieldName] && touched[firstNameFieldName]
                }
                helperText={
                    errors[firstNameFieldName] &&
                    touched[firstNameFieldName] &&
                    errors[firstNameFieldName]
                }
            />
            <TextFieldBase
                id={lastNameFieldName}
                label="Last Name"
                error={errors[lastNameFieldName] && touched[lastNameFieldName]}
                helperText={
                    errors[lastNameFieldName] &&
                    touched[lastNameFieldName] &&
                    errors[lastNameFieldName]
                }
            />
        </Grid>
    )
}
