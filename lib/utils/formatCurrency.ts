import { CartBookableItem, CartPriceRange } from '@boulevard/blvd-book-sdk/lib/cart'

export function IsNumber(value: any) {
    return !isNaN(parseFloat(value))
}

export function FormatCurrency(number: any) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number)
}

export function PriceLabelByBookableItem(bookableItem: CartBookableItem) {
    return IsNumber(bookableItem.price)
        ? PriceLabel(bookableItem.price)
        : bookableItem.price
}

export function PriceLabelByRange(priceRange: CartPriceRange) {
    return IsNumber(priceRange.min)
        ? PriceLabel(priceRange.min)
        : priceRange.min
}

export const FreePrice = 'Free'

export function PriceLabel(price: number, freeIsNumber?: boolean) {
    return price === 0 ? (freeIsNumber ? FormatCurrency(0) : FreePrice) : FormatCurrency(price / 100)
}
