import React from 'react'
import { Formik } from 'formik'
import { Box, Button } from '@mui/material'
import { theme } from 'styles/theme'
import * as Yup from 'yup'
import valid from 'card-validator'
import { useButtons } from 'components/molecules/Services/PayAndConfirm/ts/useButtons'
import { usePaymentInformationState } from 'lib/state/payment-info'
import PaymentInfo from 'components/molecules/Services/PayAndConfirm/PaymentInfo'
import PaymentSummary from 'components/molecules/Services/PayAndConfirm/PaymentSummary'
import Terms from 'components/molecules/Services/PayAndConfirm/Terms'
import { BLVDLogo } from 'components/molecules/Services/PayAndConfirm/BLVDLogo'
import {
    cardHoldersNameFieldName,
    cardNumberFieldName,
    expirationDateFieldName,
} from './ts/constants'
import { useMobile } from 'lib/utils/useMobile'
import { Services } from 'components/atoms/layout/summary/Services'
import { useSelectedServices } from 'lib/state/services'
import { useCartMethods } from 'lib/state/cart'

export default function PaymentAndTerms() {
    const [paymentInformation] = usePaymentInformationState()
    const { onContinue, isFormSubmitting } = useButtons()
    const { isMobile } = useMobile()
    const { selectedServicesStateValue } = useSelectedServices()
    const { isCartAvailableBookableItem } = useCartMethods()
    const hasServices =
        selectedServicesStateValue.filter((x) =>
            isCartAvailableBookableItem(x.item)
        ).length > 0
    return (
        <Formik
            initialValues={{
                cardHoldersName: paymentInformation.cardHoldersName,
                cardNumber: paymentInformation.cardNumber,
                expirationDate: paymentInformation.expirationDate,
                cvc: '',
            }}
            validationSchema={Yup.object().shape({
                cardHoldersName: Yup.string()
                    .test(
                        cardHoldersNameFieldName,
                        'Card holder’s name is invalid',
                        (value) => valid.cardholderName(value).isValid
                    )
                    .required('Required'),
                cardNumber: Yup.string()
                    .test(
                        cardNumberFieldName,
                        'Credit Card number is invalid',
                        (value) => valid.number(value).isValid
                    )
                    .required('Required'),
                expirationDate: Yup.string()
                    .test(
                        expirationDateFieldName,
                        'Expiration date is invalid',
                        (value) => valid.expirationDate(value).isValid
                    )
                    .required('Required'),
                cvc: Yup.string().required('Required'),
                addressPostalCode: Yup.string().required('Required'),
            })}
            onSubmit={(values) => onContinue(values)}
            validateOnChange
        >
            {({ handleSubmit }) => (
                <Box
                    sx={{
                        padding: !isMobile
                            ? theme.spacing(5, 1, 5, 8)
                            : theme.spacing(0, 3, 3, 3),
                        height: '100%',
                        overflowY: 'scroll',
                        position: 'sticky',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {isMobile && <Services />}
                    <PaymentSummary />
                    <PaymentInfo hasServices={hasServices} />
                    <Terms />
                    <Button
                        variant="contained"
                        onClick={() => handleSubmit()}
                        disabled={isFormSubmitting}
                        sx={{ mt: 3, mb: 4 }}
                    >
                        {hasServices ? 'Pay and Book' : 'Pay'}
                    </Button>
                    <BLVDLogo />
                </Box>
            )}
        </Formik>
    )
}
