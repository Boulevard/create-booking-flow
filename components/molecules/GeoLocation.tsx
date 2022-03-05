import { useEffect, useState } from 'react'
import {
    useSetCurrentPositionName,
    useSetIsLocationAccessAllowed,
    useSetIsLocationAccessAnsweredByUser,
} from 'lib/state/currentPosition'
import { PositionCoordinates } from 'lib/state/currentPosition/types'
import MapboxClient from '@mapbox/mapbox-sdk'
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { useCartStoreState } from 'lib/state/store'
import { MapType, useAppConfig } from 'lib/state/config'

interface Props {
    onUserLocationChange: (positionCoordinates: PositionCoordinates) => void
}
export const GetLocation = ({ onUserLocationChange }: Props) => {
    const { mapboxApiAccessToken } = useConfig()
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    const setIsLocationAccessAllowed = useSetIsLocationAccessAllowed()
    const setIsLocationAccessAnsweredByUser =
        useSetIsLocationAccessAnsweredByUser()
    const setCurrentPositionName = useSetCurrentPositionName()
    const [geocodingClient] = useState(
        !!mapboxApiAccessToken && mapType === MapType.MapBox ? new MapboxGeocoding(
            new MapboxClient({ accessToken: mapboxApiAccessToken })
        ) : undefined
    )
    const selectedStore = useCartStoreState()

    useEffect(() => {
        if (selectedStore) {
            setIsLocationAccessAllowed(true)
            setIsLocationAccessAnsweredByUser(true)
            return
        }
        navigator.geolocation.getCurrentPosition(
            async (position: GeolocationPosition) => {
                onUserLocationChange({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                setIsLocationAccessAllowed(true)
                setIsLocationAccessAnsweredByUser(true)
                const params = {
                    query: [
                        position.coords.longitude,
                        position.coords.latitude,
                    ],
                    types: ['place'],
                }
                if (!geocodingClient) {
                    return
                }
                geocodingClient
                    .reverseGeocode(params)
                    .send()
                    .then((res) => {
                        const features = res?.body?.features
                        if (features && features.length > 0) {
                            setCurrentPositionName(features[0]?.place_name)
                        }
                    })
            },
            () => {
                setIsLocationAccessAnsweredByUser(true)
                setIsLocationAccessAllowed(false)
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: Infinity,
            }
        )
        // eslint-disable-next-line
    }, [])

    return <></>
}
