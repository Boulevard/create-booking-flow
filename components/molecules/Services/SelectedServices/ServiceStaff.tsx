import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { useCartBookableItemListStaff } from 'lib/state/staff'
import { Box, Typography } from '@mui/material'
import { useServiceStaffStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { StaffError } from 'components/molecules/Services/SelectedServices/StaffError'
import { SelectedTime } from 'components/molecules/Services/SelectedServices/SelectedTime'
import { useCartMethods } from 'lib/state/cart'

interface Props {
    bookableItem: CartBookableItem
}

export const ServiceStaff = ({ bookableItem }: Props) => {
    const classes = useServiceStaffStyles()
    const cartBookableItemListStaff = useCartBookableItemListStaff()
    const staff = cartBookableItemListStaff?.find(
        (s) => s.cartBookableItemId === bookableItem.id
    )?.staff
    const {isCartAvailableBookableItem} = useCartMethods()

    return (
        <>
            {staff && staff.avatar && (
                <Box className={classes.staffSelected}>
                    <Typography>with {staff.name}</Typography>
                    <SelectedTime />
                </Box>
            )}
            {staff && !staff.id && (
                <Box className={classes.staffSelected}>
                    <Typography>with first available</Typography>
                    <SelectedTime />
                </Box>
            )}
            {isCartAvailableBookableItem(bookableItem.item) && <StaffError staff={staff} />}
        </>
    )
}
