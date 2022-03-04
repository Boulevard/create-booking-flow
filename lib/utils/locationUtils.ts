import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { Store as StoreType } from 'lib/state/store/types'
import { getMobileOperatingSystem } from 'lib/utils/getMobileOperatingSystem'
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl'

export const mapStyleTheme = 'mapbox://styles/mapbox/streets-v11'
export const defaultLatitude = 40.6976637
export const defaultLongitude = -74.119764
export const countryCanadaShort = 'CA'
export const NebraskaState = 'NE'
export const defaultZoom = 16
export const mapBoxTransitionDuration = 500
export const mapBoxLongTransitionDuration = 2000
export const mapBoxFlyToInterpolator = new FlyToInterpolator()
export const limitedMapBoxFlyToInterpolator = new FlyToInterpolator({
    maxDuration: 1500,
})
export const mapBoxLinearInterpolator = new LinearInterpolator()

export const appExternalUrl = 'https://google.com/'
export const scrollMapToTop = () => {
    window.scrollTo(0, 0)
}

export const getStateOrProvince = (location: Location | undefined): string => {
    if (location?.address.country === countryCanadaShort) {
        return location.address.province
    }

    return location?.address.state
}

export const getAddress = (store: StoreType | undefined) => {
    if (store === undefined || store.location.isRemote) {
        return ''
    }
    return `${store.location.address.line1}, ${
        store.location.address.city
    }, ${getStateOrProvince(store.location)} ${store.location.address.zip}`
}

export const getLocationName = (store: StoreType | undefined) => {
    if (store === undefined) {
        return ''
    }
    return store.location.name
}

export const getNavigationUrl = (location: Location | undefined) => {
    let address = `${location?.address.line1}, ${location?.address.city}, ${location?.address.country}`
    if (location?.coordinates?.latitude && location?.coordinates?.longitude) {
        address = `${location?.coordinates?.latitude}, ${location?.coordinates?.longitude}`
    }

    switch (getMobileOperatingSystem()) {
        case 'iOS':
            return `maps://maps.google.com/?q=${address}`
        case 'unknown': //probably desktop
            return `https://maps.google.com/?q=${address}`
        case 'Android':
            return `geo://maps.google.com/?q=${address}`
        default:
            return `https://maps.google.com/?q=${address}`
    }
}
