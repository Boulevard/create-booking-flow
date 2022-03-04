import { CartBookableTime } from '@boulevard/blvd-book-sdk/lib/cart'

export type StaffTimes = {
    year: number
    month: number
    day: number
    date: Date
    times: StaffTime[]
}

export interface StaffTime {
    startTime: Date //date received from the server
    localTime: Date //local time
    locationTime: Date //time of the location
    cartBookableTime?: CartBookableTime
}

export type SelectedStaffTime = {
    staffTime: StaffTime
}
