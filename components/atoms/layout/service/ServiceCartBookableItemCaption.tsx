import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { getItemAndOptionsDurationText } from 'lib/utils/durationUtils'
import { Caption } from 'components/atoms/layout/selectable-list-item/Caption'
import { useCartMethods } from 'lib/state/cart'

interface Props {
    bookableItem: CartBookableItem
}

export const ServiceCartBookableItemCaption = ({ bookableItem }: Props) => {
    let durationText = ''
    const { isCartAvailableBookableItem } = useCartMethods()
    if (isCartAvailableBookableItem(bookableItem.item)) {
        durationText = getItemAndOptionsDurationText(bookableItem)
    }


    return <Caption name={bookableItem.item.name} durationText={durationText} />
}
