import { CartAvailableBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { getDurationText } from 'lib/utils/durationUtils'
import { Caption } from 'components/atoms/layout/selectable-list-item/Caption'

interface Props {
    bookableItem: CartAvailableBookableItem
}

export const ServiceAvailableBookableItem = ({ bookableItem }: Props) => {
    const durationText = getDurationText(bookableItem)
    return <Caption name={bookableItem.name} durationText={durationText} useBold={true}/>
}
