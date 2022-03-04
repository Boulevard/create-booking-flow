import { getDurationText } from 'lib/utils/durationUtils'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { PriceLabel } from 'lib/utils/formatCurrency'

interface Props {
    bookableItem: CartBookableItem
}
export const DurationPrice = ({ bookableItem }: Props) => {
    const durationText = getDurationText(bookableItem.item)
    return (
        <>
            {durationText && (
                <>
                    <span>{durationText}</span>
                    <span> &bull; </span>
                </>
            )}
            <span>{PriceLabel(bookableItem.item.listPriceRange.min)}</span>
        </>
    )
}
