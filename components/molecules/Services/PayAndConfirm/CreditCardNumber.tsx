import { forwardRef } from 'react'
import { useFormikContext } from 'formik'
import MaskedInput from 'react-text-mask'
import { cardNumberMask } from 'constants/regexps'
import TextFieldBase from 'components/atoms/formik/TextFieldBase'
import { cardNumberFieldName } from './ts/constants'

// eslint-disable-next-line react/display-name
const CardNumberMaskCustom = forwardRef((props, ref) => {
    return <MaskedInput {...props} placeholder="" mask={cardNumberMask} />
})

export default function CreditCardNumber() {
    const { errors, touched } = useFormikContext()

    return (
        <TextFieldBase
            id={cardNumberFieldName}
            label="Credit card number"
            InputProps={{
                inputComponent: CardNumberMaskCustom,
            }}
            error={errors[cardNumberFieldName] && touched[cardNumberFieldName]}
            helperText={
                errors[cardNumberFieldName] &&
                touched[cardNumberFieldName] &&
                errors[cardNumberFieldName]
            }
        />
    )
}
