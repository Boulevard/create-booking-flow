import { CartAvailableBookableItemOption } from '@boulevard/blvd-book-sdk/lib/carts/items'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { FiPlusCircle } from 'react-icons/fi'
import { Box } from '@mui/material'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { useAvailableServiceOptionStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { Option } from 'components/molecules/Services/SelectedServices/Option'

interface Props {
    option: CartAvailableBookableItemOption
    bookableItem: CartBookableItem
}

export const AvailableServiceOption = ({ option, bookableItem }: Props) => {
    const classes = useAvailableServiceOptionStyles()
    const cart = useCartState()
    const { addAddon } = useCartMethods()
    const addOption = async () => {
        if (cart === undefined) {
            return
        }

        await addAddon(cart, bookableItem, option)
    }

    return (
        <Box className={classes.optionRoot}>
            <Box className={classes.plus} onClick={addOption}>
                <FiPlusCircle size={15} />
            </Box>
            <Box className={classes.textWrapper}>
                <Option option={option} />
                <Box component="span" className={classes.description}>
                    {option.description}
                </Box>
            </Box>
        </Box>
    )
}
