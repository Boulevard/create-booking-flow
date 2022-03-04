import { useFormikContext } from 'formik'
import { Box, Button } from '@mui/material'
import { useMobile } from 'lib/utils/useMobile'

interface Props {
    onBack: () => void
    showBackButton: boolean
    isFormSubmitting: boolean
    showContinue: boolean
    continueButtonText?: string
}

export default function WizardButtons({
    onBack,
    showBackButton,
    isFormSubmitting,
    showContinue,
    continueButtonText,
}: Props) {
    const { isMobile } = useMobile()
    const { handleSubmit } = useFormikContext()

    return (
        <Box
            sx={{
                pt: 4,
                pb: 4,
                ...(isMobile && {
                    display: 'flex',
                    justifyContent: 'space-between',
                }),
            }}
        >
            {showBackButton && (
                <Button
                    variant="outlined"
                    sx={{
                        marginRight: '13px',
                        ...(isMobile && {
                            width: '50%',
                        }),
                    }}
                    onClick={onBack}
                >
                    Back
                </Button>
            )}
            {showContinue && (
                <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                    disabled={isFormSubmitting}
                    sx={{
                        ...(isMobile && {
                            width: '50%',
                        }),
                    }}
                >
                    {continueButtonText ? continueButtonText : 'Continue'}
                </Button>
            )}
        </Box>
    )
}
