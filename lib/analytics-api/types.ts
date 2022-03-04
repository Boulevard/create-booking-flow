import { Location } from '@boulevard/blvd-book-sdk/lib/locations'

export interface AppointmentBase {
    location: Location | undefined
}

export interface AppointmentLocationSelected extends AppointmentBase {}

export interface AppointmentTimeSelected extends AppointmentBase {}

export interface AppointmentBookingConfirmed extends AppointmentBase {
    serviceName: string
}
