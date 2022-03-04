import { CartAvailableBookableItemOption } from '@boulevard/blvd-book-sdk/lib/carts/items'
import { Box } from '@mui/material'
import { PriceLabel } from 'lib/utils/formatCurrency'

interface Props {
    option: CartAvailableBookableItemOption
}
export const Option = ({ option }: Props) => {
    return (
        <Box>
            {option.name} (+
            {PriceLabel(option.priceDelta)})
        </Box>
    )
}
