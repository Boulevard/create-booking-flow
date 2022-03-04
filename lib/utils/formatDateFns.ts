import { format as formatFn, toDate } from 'date-fns-tz'

export const TimeFormat = 'h:mma'

export const cartTimeToDate = (
    dateTime: any,
    defaultDate?: Date | undefined
) => {
    if (dateTime === undefined || dateTime === null) {
        return defaultDate
    }
    return toDate(dateTime)
}

export default function formatDateFns(
    date: Date | string | undefined,
    timeZone: string,
    format: string
) {
    if (!date) {
        return ''
    }
    return formatFn(toDate(date, { timeZone: timeZone }), format, {
        timeZone: timeZone,
    })
}
