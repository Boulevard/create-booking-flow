import { Blvd, PlatformTarget } from '@boulevard/blvd-book-sdk'

const businessId = process.env.NEXT_PUBLIC_BLVD_BUSINESS_ID
const apiKey = process.env.NEXT_PUBLIC_BLVD_API_KEY
export const live = 'live'
export const defaultLocationExternalId =
    process.env.NEXT_PUBLIC_BLVD_DEFAULT_LOCATION_EXTERNAL_ID

// safety net for misconfiguration
if (!businessId || !apiKey) {
    throw new Error(
        'Either NEXT_PUBLIC_BLVD_BUSINESS_ID or NEXT_PUBLIC_BLVD_API_KEY are undefined'
    )
}

const client =
    process.env.NEXT_PUBLIC_BLVD_PLATFORM === live
        ? new Blvd(apiKey, businessId, PlatformTarget.Live)
        : new Blvd(apiKey, businessId)

export { client as Blvd }
