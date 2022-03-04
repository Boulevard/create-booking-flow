import {
    AppointmentBookingConfirmed,
    AppointmentLocationSelected,
    AppointmentTimeSelected,
} from 'lib/analytics-api/types'
import { useGoogleAnalytics } from 'lib/analytics-api/googleAnalyticsUtils'

export const useAnalyticsService = () => {
    const ga = useGoogleAnalytics()
    const gaAppointmentLocationSelected = ga.appointmentLocationSelected
    const gaAppointmentTimeSelected = ga.appointmentTimeSelected
    const gaAppointmentBookingConfirmed = ga.appointmentBookingConfirmed

    const appointmentLocationSelected = async (
        appointmentLocationSelected: AppointmentLocationSelected
    ): Promise<void> => {
        Promise.all([
            gaAppointmentLocationSelected(
                appointmentLocationSelected.location?.name
            ),
        ]).catch()
    }

    const appointmentTimeSelected = async (
        appointmentTimeSelected: AppointmentTimeSelected
    ): Promise<void> => {
        Promise.all([
            gaAppointmentTimeSelected(appointmentTimeSelected.location?.name),
        ]).catch()
    }

    const appointmentBookingConfirmed = async (
        appointmentBookingConfirmed: AppointmentBookingConfirmed
    ): Promise<void> => {
        Promise.all([
            gaAppointmentBookingConfirmed(
                appointmentBookingConfirmed.serviceName
            ),
        ]).catch()
    }

    return {
        appointmentLocationSelected: appointmentLocationSelected,
        appointmentTimeSelected: appointmentTimeSelected,
        appointmentBookingConfirmed: appointmentBookingConfirmed,
    }
}
