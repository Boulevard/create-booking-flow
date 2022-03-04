import { Store } from 'lib/state/store/types'

export interface SuccessBookingCartInfo {
    total: number
    startTime: string
    endTime: string
    store: Store
    icsLink: string
}
