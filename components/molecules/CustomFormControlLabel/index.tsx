import { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { FormControlLabel, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'

interface CustomFormControlLabelProps extends FormControlLabelProps {
    controlLabelStyles: Record<string, any>
    checkedBorder?: string
    checkedControlLabelStyles?: Record<string, any>
}

interface StyledFormControlLabelProps extends CustomFormControlLabelProps {
    checked: boolean
}

const FormControlLabelBase = (props: StyledFormControlLabelProps) => {
    const {
        checked,
        controlLabelStyles,
        checkedBorder,
        checkedControlLabelStyles,
        ...other
    } = props
    return <FormControlLabel {...other} />
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
    <FormControlLabelBase {...props} />
))(({ controlLabelStyles, checkedControlLabelStyles, checked }) => ({
    '.MuiFormControlLabel-label': {
        ...controlLabelStyles,
        ...(checked && checkedControlLabelStyles),
    },
    '& .Mui-disabled': {
        opacity: 0.1,
    },
}))

export const CustomFormControlLabel = (props: CustomFormControlLabelProps) => {
    const theme = useTheme()

    return (
        <StyledFormControlLabel
            sx={{
                boxShadow: props.checked
                    ? `0px 0px 0px 2px ${theme.palette.primary.main}`
                    : `0px 0px 0px 1px ${theme.palette.custom.lightGray}`,
            }}
            checked={props.checked!}
            {...props}
        />
    )
}
