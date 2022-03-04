import { useMobile } from 'lib/utils/useMobile'
import { useIsShowMap, useLocationSelectedStoreState, useMapView, useSetMapViewportState } from 'lib/state/location'
import { useStores } from 'lib/sdk/hooks/useStores'
import { useCartStoreState } from 'lib/state/store'
import { useEffect, useState } from 'react'
import { sortByDistance } from 'lib/utils/sortUtils'
import { PositionCoordinates } from 'lib/state/currentPosition/types'
import {
    defaultZoom,
    mapBoxFlyToInterpolator,
    mapBoxLongTransitionDuration,
    scrollMapToTop
} from 'lib/utils/locationUtils'
import { Store } from 'lib/state/store/types'

export const useLeftPanel = () => {
    const { isMobile } = useMobile()
    const [isShowMap] = useIsShowMap()
    const setViewport = useSetMapViewportState()
    const { getMapViewportState } = useMapView()
    const { stores, getDistanceByPosition } = useStores()
    const selectedStore = useCartStoreState()
    const [locationSelectedStore, setLocationSelectedStore] =
        useLocationSelectedStoreState()
    const [orderStores, setOrderStores] = useState(
        stores.concat().sort((a, b) => sortByDistance(a, b, undefined))
    )

    useEffect(() => {
        if (orderStores.length === 0) {
            setOrderStores(stores)
        }
        // eslint-disable-next-line
    }, [stores])

    useEffect(() => {
        if (isMobile) {
            setOrderStores(
                orderStores
                    .concat()
                    .sort((a, b) =>
                        sortByDistance(
                            a,
                            b,
                            isShowMap ? locationSelectedStore : undefined
                        )
                    )
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationSelectedStore, isShowMap])

    const onUserLocationChange = (positionCoordinates: PositionCoordinates) => {
        if (
            locationSelectedStore?.location?.id !== selectedStore?.location?.id
        ) {
            setLocationSelectedStore(selectedStore)
        }
        if (selectedStore === undefined) {
            const viewport = getMapViewportState()
            const updatedViewPort = {
                ...viewport,
                ...{
                    longitude: positionCoordinates.longitude,
                    latitude: positionCoordinates.latitude,
                    zoom: defaultZoom,
                    transitionDuration: 0,
                },
            }
            updateStoreDistance(
                updatedViewPort.longitude,
                updatedViewPort.latitude
            )
            setViewport(updatedViewPort)
        }
    }

    const updateStoreDistance = (longitude, latitude): Store[] => {
        let updatedStores: Store[] = []
        setOrderStores((prevStores) => {
            updatedStores = prevStores
                .map((store: Store) => {
                    return {
                        ...store,
                        distance: getDistanceByPosition(
                            {
                                latitude,
                                longitude,
                            },
                            {
                                latitude:
                                    store.location.coordinates?.latitude ?? 0,
                                longitude:
                                    store.location.coordinates?.longitude ?? 0,
                            }
                        ),
                    }
                })
                .sort((a, b) => sortByDistance(a, b, locationSelectedStore))
            return updatedStores
        })
        return updatedStores
    }

    const onSelected = (viewport) => {
        scrollMapToTop()
        updateStoreDistance(viewport.longitude, viewport.latitude)
        setViewport({
            ...viewport,
            transitionDuration: mapBoxLongTransitionDuration,
            transitionInterpolator: mapBoxFlyToInterpolator,
        })
        setLocationSelectedStore(undefined)
    }

    return {
        onSelected: onSelected,
        orderStores: orderStores,
        stores: stores,
        onUserLocationChange: onUserLocationChange,
    }
}
