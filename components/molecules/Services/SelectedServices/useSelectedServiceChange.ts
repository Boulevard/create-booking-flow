import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import {
    cartAvailableBookableItemStaffVariantToStaff,
    useSetAllowChooseStaffError,
    useSetBookableStaffVariants
} from 'lib/state/staff'
import { useCartMethods } from 'lib/state/cart'

export const useSelectedServiceChange = () => {
    const {isCartAvailableBookableItem} = useCartMethods()
    const setBookableStaffVariants = useSetBookableStaffVariants()
    const setAllowChooseStaffError = useSetAllowChooseStaffError()

    const handleServiceChange = async (bookableItem: CartBookableItem) => {
        setAllowChooseStaffError(true)
        if (isCartAvailableBookableItem(bookableItem.item)) {
            const staffs = await bookableItem.item.getStaffVariants()
            setBookableStaffVariants(
                staffs.flatMap((z) =>
                    cartAvailableBookableItemStaffVariantToStaff(z)
                )
            )
        } else {
            setBookableStaffVariants([])
        }
    }

    return {
        handleServiceChange: handleServiceChange,
    }
}
