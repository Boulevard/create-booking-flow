import { useFormikContext } from 'formik'
import TextFieldBase from 'components/atoms/formik/TextFieldBase'
import { cardHoldersNameFieldName } from '../PayAndConfirm/ts/constants'

export default function CardHoldersName() {
    const { errors, touched } = useFormikContext()

    return (
        <TextFieldBase
            id={cardHoldersNameFieldName}
            label="Card holder’s name"
            error={
                errors[cardHoldersNameFieldName] &&
                touched[cardHoldersNameFieldName]
            }
            helperText={
                errors[cardHoldersNameFieldName] &&
                touched[cardHoldersNameFieldName] &&
                errors[cardHoldersNameFieldName]
            }
            inputProps={{ sx: { textTransform: 'uppercase' } }}
        />
    )
}
