import { useCartState } from 'lib/state/cart'
import { useSelectedServices } from 'lib/state/services'
import { Box, Typography } from '@mui/material'
import { PriceLabel, PriceLabelByBookableItem } from 'lib/utils/formatCurrency'
import { useStyles } from 'components/molecules/PaymentSummaryControl/useStyles'
import Color from 'config/colors.json'

interface Props {
    isTopSummaryMode: boolean
    onServiceNameClick?: (bookableItem) => void
}

export const PaymentSummaryControl = ({isTopSummaryMode, onServiceNameClick}: Props) => {
    const classes = useStyles()
    const cart = useCartState()
    const { selectedServicesStateValue, reverseSelectedServices } =
        useSelectedServices()
    const reversedList = reverseSelectedServices(selectedServicesStateValue)
    const onServiceNameClickInternal = async (bookableItem) => {
        if (onServiceNameClick) {
            await onServiceNameClick(bookableItem)
        }
    }
    const hasServices = selectedServicesStateValue.length > 0
    return (
        <>
            <Box className={classes.servicesBlock} sx={{borderBottom: isTopSummaryMode ? 'none' : '1px solid #C4C4C4'}}>
                {reversedList.map((bookableItem) => (
                    <Box
                        key={bookableItem.id}
                        className={classes.boxWrapperCommon}
                    >
                        <Box>
                            <Typography
                                sx={{ pr: 2 }}
                                variant="body2"
                                component="span"
                            >
                                x1
                            </Typography>
                            <Typography component="span"
                                onClick={() => onServiceNameClickInternal(bookableItem)}
                                sx={{
                                    cursor: isTopSummaryMode ? "pointer" : undefined,
                                    color: isTopSummaryMode ? Color.primary.main: undefined
                            }}>
                                {` ${bookableItem.item.name}`}
                            </Typography>
                        </Box>
                        <Typography sx={{ pl: 1 }}>
                            {PriceLabelByBookableItem(bookableItem)}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Box
                className={classes.boxWrapperCommon}
                sx={{
                    pt: 2,
                }}
            >
                <Typography>Total (exc. tax)</Typography>
                <Typography>
                    {hasServices ? PriceLabel(cart?.summary.subtotal, true) : 'Pending'}
                </Typography>
            </Box>
            <Box
                className={classes.boxWrapperCommon}
                sx={{
                    pb: 3,
                }}
            >
                <Typography>Tax</Typography>
                <Typography sx={{ pl: 1 }}>
                    {hasServices ? PriceLabel(cart?.summary.taxAmount, true) : 'Pending'}
                </Typography>
            </Box>
            <Box className={classes.totalBlock}>
                <Typography>{isTopSummaryMode ? 'Estimated order total:' : 'Order total:'}</Typography>
                <Typography sx={{ pl: 1 }}>
                    {hasServices ? PriceLabel(cart?.summary.total, true) : 'Pending'}
                </Typography>
            </Box>
        </>
    )
}
