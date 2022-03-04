import { forwardRef } from 'react'
import { useFormikContext } from 'formik'
import { Grid } from '@mui/material'
import MaskedInput from 'react-text-mask'
import { cardExpirationDateMask, cvcMask } from 'constants/regexps'
import TextFieldBase from 'components/atoms/formik/TextFieldBase'
import {
    expirationDateFieldName,
    cvcFieldName,
} from '../PayAndConfirm/ts/constants'

// eslint-disable-next-line react/display-name
const ExpirationDateMaskCustom = forwardRef((props, ref) => {
    return (
        <MaskedInput
            {...props}
            placeholder="  /  "
            mask={cardExpirationDateMask}
        />
    )
})

// eslint-disable-next-line react/display-name
const CVCMaskCustom = forwardRef((props, ref) => {
    return <MaskedInput {...props} placeholder="" mask={cvcMask} />
})

export default function ExpirationCVCAndZipcode() {
    const { errors, touched } = useFormikContext()

    return (
        <>
            <Grid item lg={2} md={5} sm={5} xs={6}>
                <TextFieldBase
                    id={expirationDateFieldName}
                    label="Expiration"
                    InputProps={{
                        inputComponent: ExpirationDateMaskCustom,
                    }}
                    error={
                        errors[expirationDateFieldName] &&
                        touched[expirationDateFieldName]
                    }
                    helperText={
                        errors[expirationDateFieldName] &&
                        touched[expirationDateFieldName] &&
                        errors[expirationDateFieldName]
                    }
                />
            </Grid>
            <Grid item lg={2} md={5} sm={5} xs={6}>
                <TextFieldBase
                    id={cvcFieldName}
                    label="CVC"
                    InputProps={{
                        inputComponent: CVCMaskCustom,
                    }}
                    error={errors[cvcFieldName] && touched[cvcFieldName]}
                    helperText={
                        errors[cvcFieldName] &&
                        touched[cvcFieldName] &&
                        errors[cvcFieldName]
                    }
                />
            </Grid>
        </>
    )
}
