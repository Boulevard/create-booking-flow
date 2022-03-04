import { CartBookableDate } from '@boulevard/blvd-book-sdk/lib/cart'

export type StaffDates = {
    year: number
    month: number
    dates: StaffDate[]
}

export type StaffDate = {
    date: Date
    cartBookableDate: CartBookableDate
}

export type SelectedStaffDate = {
    date: Date
    cartBookableDate?: CartBookableDate
}
