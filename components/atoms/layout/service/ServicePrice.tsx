import { CartAvailableBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { FreePrice, PriceLabelByRange } from 'lib/utils/formatCurrency'
import { Price } from 'components/atoms/layout/selectable-list-item/Price'

interface Props {
    bookableItem: CartAvailableBookableItem
    classesCardItemPrice?: any
}

export const ServicePrice = ({ bookableItem, classesCardItemPrice }: Props) => {
    const price = PriceLabelByRange(bookableItem.listPriceRange)
    const priceStr = price === FreePrice ? price : `Starting from ${price}`
    return (
        <Price
            classesCardItemPrice={classesCardItemPrice}
            priceStr={priceStr}
        />
    )
}
