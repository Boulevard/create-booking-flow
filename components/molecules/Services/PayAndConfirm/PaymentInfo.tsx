import { Box, Typography, Grid } from '@mui/material'
import CardHoldersName from 'components/molecules/Services/PayAndConfirm/CardHoldersName'
import CreditCardNumber from 'components/molecules/Services/PayAndConfirm/CreditCardNumber'
import ExpirationCVCAndZipcode from 'components/molecules/Services/PayAndConfirm/ExpirationCVCAndZipcode'

interface Props {
    hasServices: boolean
}

export default function PaymentInfo({hasServices}: Props) {
    return (
        <Box>
            <Typography variant="h3" sx={{ pb: 1 }}>
                Payment info
            </Typography>
            {hasServices && <Typography sx={{ pb: 1 }}>
                Your card will not be charged until your appointment is completed.
            </Typography>}
            <Grid item lg={4} md={10} sm={10} xs={12}>
                <CardHoldersName />
            </Grid>
            <Grid item lg={4} md={10} sm={10} xs={12}>
                <CreditCardNumber />
            </Grid>
            <ExpirationCVCAndZipcode />
        </Box>
    )
}
