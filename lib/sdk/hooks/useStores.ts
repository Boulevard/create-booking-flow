import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { useSetStoresState, useStoresState } from 'lib/state/store'
import haversine from 'haversine'
import { roundNumber } from 'lib/utils/numberUtils'
import { Store } from 'lib/state/store/types'
import { useCurrentPosition } from 'lib/state/currentPosition'
import { PositionCoordinates } from 'lib/state/currentPosition/types'

export const useStores = () => {
    const currentPosition = useCurrentPosition()
    const stores = useStoresState()
    const setStores = useSetStoresState()

    //const round
    const getDistanceByPosition = (
        userPosition: PositionCoordinates,
        storePosition: haversine.CoordinateLongitudeLatitude
    ): number => {
        const distance = haversine(userPosition, storePosition, {
            unit: 'mile',
        })
        return roundNumber(distance, 1)
    }

    const getDistance = (
        storePosition: haversine.CoordinateLongitudeLatitude
    ): number => {
        return getDistanceByPosition(currentPosition, storePosition)
    }

    const getStoreFromLocation = (location: Location): Store => {
        let lat: number = 0
        let lng: number = 0

        if (location.coordinates?.latitude && location.coordinates?.longitude) {
            lat = location.coordinates?.latitude
            lng = location.coordinates?.longitude
        }
        const distance = getDistance({
            latitude: lat,
            longitude: lng,
        })
        return {
            distance: distance,
            lng: lng,
            lat: lat,
            location: location,
        } as Store
    }

    const setLocations = (locations: Location[]) => {
        const result = locations.map((l) => getStoreFromLocation(l))
        //sort stores by distance asc
        result.sort((a, b) =>
            a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
        )
        setStores(result)
    }

    return {
        stores: stores,
        getStoreFromLocation: getStoreFromLocation,
        setLocations: setLocations,
        getDistanceByPosition: getDistanceByPosition,
    }
}
