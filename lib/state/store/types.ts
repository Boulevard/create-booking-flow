import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { CartAvailableBookableItemLocationVariant } from '@boulevard/blvd-book-sdk/lib/carts/items'

export interface Store {
    distance: number
    lng: number
    lat: number
    location: Location
}

export interface AvailableBookableItemStores {
    availableBookableItemId: string
    cartAvailableBookableItemLocationVariant: CartAvailableBookableItemLocationVariant[]
}
