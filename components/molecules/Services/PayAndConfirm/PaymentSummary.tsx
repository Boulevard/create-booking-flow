import React from 'react'
import { Box, Theme, Typography } from '@mui/material'
import { usePersonalInformationState } from 'lib/state/personal-info'
import { useMobile } from 'lib/utils/useMobile'
import { PaymentSummaryControl } from 'components/molecules/PaymentSummaryControl'
import { makeStyles } from '@mui/styles'
import { useSelectedServices } from 'lib/state/services'
import { useCartMethods } from 'lib/state/cart'
interface StylesProps {
    isMobile: boolean
}

export const useStyles = makeStyles((theme: Theme) => ({
    summaryBlock: {
        width: '100%',
        maxWidth: (props: StylesProps) => (!props.isMobile ? '458px' : '100%'),
        background: 'rgba(255, 255, 255, 0.05)',
        padding: (props: StylesProps) => (!props.isMobile ? theme.spacing(3) : 0),
        marginLeft: (props: StylesProps) => (!props.isMobile ? theme.spacing(-3) : 0),
        border: (props: StylesProps) => (!props.isMobile ? '1px solid #C4C4C4' : 'none'),
        borderRadius: '8px',
        boxShadow: (props: StylesProps) => (!props.isMobile ? '4px 4px 4px rgba(0, 0, 0, 0.1)' : 'none'),
        '& .MuiTypography-root': {
            fontWeight: 500,
        },
    },
}))

export default function PaymentSummary() {
    const { isMobile } = useMobile()
    const [personalInformation] = usePersonalInformationState()
    const classes = useStyles({ isMobile })
    const { selectedServicesStateValue } = useSelectedServices()
    const { isCartAvailablePurchasableItem } = useCartMethods()
    const hasProducts = selectedServicesStateValue.filter(x=>isCartAvailablePurchasableItem(x.item)).length > 0
    const appointmentOrderText = hasProducts ? 'Order' : 'Appointment'
    return (
        <Box sx={{ pt: isMobile ? 5 : 0, pb: 5 }}>
            <Typography variant="h3" sx={{ pb: 3 }}>
                {`${appointmentOrderText} summary for ${personalInformation.firstName} ${personalInformation.lastName}`}
            </Typography>
            <Box className={classes.summaryBlock}>
                <PaymentSummaryControl isTopSummaryMode={false}/>
            </Box>
        </Box>
    )
}
