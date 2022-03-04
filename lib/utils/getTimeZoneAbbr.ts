import { format as formatFn } from 'date-fns-tz'

export default function getTimeZoneAbbr(locationTz: string) {
    const currentLocationTimeZone = formatFn(new Date(), 'zzz')
    const storeLocationTimeZone = formatFn(new Date(), 'zzz', {
        timeZone: locationTz,
    })

    if (currentLocationTimeZone !== storeLocationTimeZone) {
        return storeLocationTimeZone
    } else {
        return null
    }
}
