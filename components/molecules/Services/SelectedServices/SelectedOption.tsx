import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Box } from '@mui/material'
import { FiXCircle } from 'react-icons/fi'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { CartAvailableBookableItemOption } from '@boulevard/blvd-book-sdk/lib/carts/items'
import { useSelectedOptionStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { Option } from 'components/molecules/Services/SelectedServices/Option'

interface Props {
    bookableItem: CartBookableItem
    option: CartAvailableBookableItemOption
    isReadMode?: boolean
}

export const SelectedOption = ({ bookableItem, option, isReadMode }: Props) => {
    const classes = useSelectedOptionStyles()
    const cart = useCartState()
    const { removeAddon } = useCartMethods()
    const removeOption = async (option: CartAvailableBookableItemOption) => {
        if (cart === undefined || isReadMode) {
            return
        }

        await removeAddon(cart, bookableItem, option)
    }

    return (
        <Box className={classes.root}>
            <Option option={option} />
            {!isReadMode && (
                <Box
                    component="span"
                    className={classes.remove}
                    onClick={() => removeOption(option)}
                >
                    <FiXCircle size={15} />
                </Box>
            )}
        </Box>
    )
}
