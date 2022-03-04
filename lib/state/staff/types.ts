import { CartAvailableBookableItemStaffVariant } from '@boulevard/blvd-book-sdk/lib/carts/items'

export interface Staff {
    id: string | null
    name: string
    description?: string
    avatar?: string
    staffVariant?: CartAvailableBookableItemStaffVariant
}

export interface CartBookableItemStaff {
    cartBookableItemId: string
    staff: Staff
}
