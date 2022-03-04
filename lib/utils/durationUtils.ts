import {
    CartAvailableBookableItem,
    CartBookableItem,
} from '@boulevard/blvd-book-sdk/lib/cart'

export const getDurationTextFromNumber = (
    durationInMinutes: number | undefined
): string => {
    if (durationInMinutes == undefined) {
        return ''
    }

    if (durationInMinutes < 60) {
        return `${durationInMinutes}min`
    }

    const minutesInHour = 60
    const hours = Math.floor(durationInMinutes / minutesInHour)
    const minutes = durationInMinutes % minutesInHour
    const plural = hours > 1 ? 's' : ''
    let result = `${hours}hour${plural}`
    if (minutes > 0) {
        result = `${result} ${minutes}min`
    }
    return result
}

export const getDurationText = (
    bookableItem: CartAvailableBookableItem
): string => {
    const durationInMinutes = bookableItem?.listDurationRange?.min
    return getDurationTextFromNumber(durationInMinutes)
}

export const getItemAndOptionsDurationText = (
    bookableItem: CartBookableItem
): string => {
    let durationInMinutes = bookableItem.item?.listDurationRange?.min ?? 0
    if (bookableItem.selectedOptions) {
        for (let option of bookableItem.selectedOptions) {
            durationInMinutes += option.durationDelta ?? 0
        }
    }
    return getDurationTextFromNumber(durationInMinutes)
}

export const getDurationInMinutes = (
    startTimeStr: string | undefined,
    endTimeStr: string | undefined
) => {
    if (!startTimeStr || !endTimeStr) {
        return undefined
    }
    const startTime: any = new Date(startTimeStr)
    const endTime: any = new Date(endTimeStr)
    const durationDiffInMs = Math.abs(endTime - startTime)
    return durationDiffInMs / (1000 * 60)
}
