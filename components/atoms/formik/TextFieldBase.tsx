import { TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import { getFormikValue } from 'components/atoms/formik/ts/utils'
import { TextFieldProps } from '@mui/material/TextField/TextField'

type Props = TextFieldProps & {
    id: string
}

export default function TextFieldBase(props: Props) {
    const { id, ...other } = props
    const { handleChange, values } = useFormikContext()

    const getValue = () => {
        return getFormikValue(values, id)
    }

    return (
        <TextField
            id={id}
            name={id}
            value={getValue()}
            InputLabelProps={{
                focused: !!getValue(),
            }}
            onChange={handleChange}
            {...other}
        />
    )
}
