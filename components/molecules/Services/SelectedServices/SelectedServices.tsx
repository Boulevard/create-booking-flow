import { useSelectedServices } from 'lib/state/services'
import { Service } from 'components/molecules/Services/SelectedServices/Service'
import { Box } from '@mui/material'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { useServicesListStyles } from 'components/molecules/Services/SelectService/useStyles'

interface Props {
    handleServiceChange?: (bookableItem: CartBookableItem) => void
}

export const SelectedServices = ({ handleServiceChange }: Props) => {
    const classes = useServicesListStyles()
    const { selectedServicesStateValue, reverseSelectedServices } =
        useSelectedServices()
    const reversedList = reverseSelectedServices(selectedServicesStateValue)

    return (
        <Box className={classes.root} sx={{ height: 'calc(100% - 87px)' }}>
            {reversedList?.map((cartItem) => (
                <Service
                    key={cartItem.id}
                    bookableItem={cartItem}
                    handleServiceChange={handleServiceChange}
                />
            ))}
        </Box>
    )
}
