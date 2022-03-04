import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useCartState } from 'lib/state/cart'
import { useButtons } from 'components/molecules/Services/PersonalInfo/ts/useButtons'
import {
    getBookingQuestionsInitialValues,
    getBookingQuestionsValidationSchema,
} from 'components/molecules/Services/PersonalInfo/ts/formikUtils'
import { usePersonalInformationState } from 'lib/state/personal-info'
import { phoneRegExp } from '../../../../constants/regexps'
import YourInfoForm from 'components/molecules/Services/PersonalInfo/YourInfoForm'
import { useBookingAnswers } from 'lib/state/booking-answers'

export default function YourAndAdditionalInfo() {
    const cart = useCartState()
    const [personalInformation] = usePersonalInformationState()
    const { onContinue } = useButtons()
    const bookingAnswers = useBookingAnswers()

    return (
        <Formik
            initialValues={{
                firstName: personalInformation.firstName,
                lastName: personalInformation.lastName,
                email: personalInformation.email,
                phone: personalInformation.phone,
                ...getBookingQuestionsInitialValues(cart, bookingAnswers),
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required('Required'),
                lastName: Yup.string().required('Required'),
                email: Yup.string()
                    .email('Email address is not valid')
                    .required('Required'),
                phone: Yup.string()
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .required('Required'),
                ...getBookingQuestionsValidationSchema(cart),
            })}
            onSubmit={(values) => onContinue(values)}
            validateOnChange
        >
            {() => <YourInfoForm />}
        </Formik>
    )
}
