export const useGoogleAnalytics = () => {
    const googleAnalyticsKey = process.env.GOOGLE_ANALYTICS_KEY
    const pageView = (url: URL): void => {
        if (!googleAnalyticsKey) {
            return
        }
        window.gtag('config', googleAnalyticsKey, {
            page_path: url,
        })
    }

    const event = async (action: string, label: any): Promise<void> => {
        if (!googleAnalyticsKey) {
            return
        }
        window.gtag('event', action, {
            event_category: 'BLVD',
            event_label: label,
        })
    }

    const appointmentLocationSelected = (storeName: string): Promise<void> => {
        return event('Store Selected ', `Store: ${storeName}`)
    }

    const appointmentTimeSelected = (storeName: string): Promise<void> => {
        return event('Time Selected ', `Store: ${storeName}`)
    }

    const appointmentBookingConfirmed = (
        serviceName: string
    ): Promise<void> => {
        return event('Appointment Confirmed ', `Service: ${serviceName}`)
    }

    return {
        pageView: pageView,
        googleAnalyticsKey: googleAnalyticsKey,
        appointmentLocationSelected: appointmentLocationSelected,
        appointmentTimeSelected: appointmentTimeSelected,
        appointmentBookingConfirmed: appointmentBookingConfirmed,
    }
}
