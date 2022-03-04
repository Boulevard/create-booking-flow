import React from 'react'
import { Box, Typography } from '@mui/material'
import { useCartState } from 'lib/state/cart'
import QuestionElement from './Questions/QuestionElement'

export default function AdditionalInfo() {
    const cartState = useCartState()

    return (
        <Box sx={{ pt: 5 }}>
            <Typography variant="h3" sx={{ pb: 1 }}>
                Additional Information
            </Typography>
            {cartState &&
                cartState.bookingQuestions.map((question) => (
                    <QuestionElement key={question.id} question={question} />
                ))}
        </Box>
    )
}
