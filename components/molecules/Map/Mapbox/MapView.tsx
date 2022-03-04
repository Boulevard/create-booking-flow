import React, { useEffect, useRef, useState } from 'react'
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl'
import { GeoJSON } from 'lib/geojson/GeoJSON'
import {
    clusterCountLayer,
    clusterLayer,
    clusterLayerShadow,
    unclusterCountLayer,
} from 'components/molecules/Map/Mapbox/Layers'
import {
    useMapViewportState,
    useLocationSelectedStoreState,
    useSetDefineLocationMapViewportState,
    useUpdateStoresViewportState,
} from 'lib/state/location'
import { CustomMarker } from 'components/molecules/Map/Mapbox/CustomMarker'
import { CustomStorePopup } from 'components/molecules/Map/Mapbox/CustomStorePopup'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { Store } from 'lib/state/store/types'
import { WebMercatorViewport } from 'viewport-mercator-project'
import {
    mapBoxLinearInterpolator,
    mapStyleTheme,
} from 'lib/utils/locationUtils'
import { grab, pointer } from 'components/molecules/Map/Mapbox/cursors'
import { useMobile } from 'lib/utils/useMobile'
import { scrollIntoStore } from 'components/molecules/Map/helper'

interface Props {
    stores: Store[]
    handleUpdate: boolean
}

export const MapView = ({ stores, handleUpdate }: Props) => {
    const { isMobile } = useMobile()
    const mapRef = useRef(null)
    const [globalViewport] = useMapViewportState()
    const updateStoresViewport = useUpdateStoresViewportState()
    const setDefineLocationMapViewportState =
        useSetDefineLocationMapViewportState()
    const [viewport, setViewport] = useState(globalViewport)
    const [locationSelectedStore, setLocationSelectedStore] =
        useLocationSelectedStoreState()
    const [storesGeo, setStoresGeo] = useState({} as any)
    const [storesToDisplay, setStoresToDisplay] = useState([] as Store[])
    const [isTransitionInProgress, setIsTransitionInProgress] = useState(false)
    const [cursor, setCursor] = useState(grab)
    const [isUnmount, setIsUnmount] = useState(false)

    const { mapboxApiAccessToken } = useConfig()
    const navControlStyle = {
        right: 20,
        bottom: 50,
    }

    const setLocationStoreSelected = (store: Store | undefined) => {
        setLocationSelectedStore(store)
    }

    useEffect(() => {
        setViewport({ ...viewport, ...globalViewport })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalViewport])

    useEffect(() => {
        updateStoresToDisplayExternalViewport(updateStoresViewport)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateStoresViewport])

    useEffect(() => {
        const geo = new GeoJSON()
        const geoStores = geo.parse(stores, { Point: ['lat', 'lng'] })
        setStoresGeo(geoStores)
        updateStoresToDisplay()
        return () => {
            setIsUnmount(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stores])

    const closeStorePopup = () => {
        setLocationStoreSelected(undefined)
    }

    const selectStore = (store) => {
        setLocationStoreSelected(store)
        scrollIntoStore(isMobile, store)
    }

    const handleViewportChange = (viewport) => {
        if (!handleUpdate || isUnmount) {
            return
        }
        setViewport(viewport)
        setDefineLocationMapViewportState(viewport)
    }

    const getFeatures = (pos) => {
        const map = mapRef.current as any
        if (!map || !pos || !map.getMap().loaded()) {
            return []
        }

        const queryParams = {
            layers: [clusterLayer.id!],
        }

        try {
            return map.queryRenderedFeatures(pos, queryParams)
        } catch {
            return []
        }
    }

    const getCursor = () => {
        return cursor
    }

    const onHover = (event) => {
        event.features = getFeatures(event.point)
        const feature = event.features[0]
        if (!feature) {
            if (cursor !== grab) {
                setCursor(grab)
            }
            return
        }
        if (cursor !== pointer) {
            setCursor(pointer)
        }
    }

    const onClick = (event) => {
        event.features = getFeatures(event.point)
        const feature = event.features[0]
        if (!feature) {
            return
        }
        const clusterId = feature.properties.cluster_id

        const map = mapRef.current as any
        const mapboxSource = map.getMap().getSource('stores')

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return
            }
            handleViewportChange({
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom: isNaN(zoom) ? 7 : zoom + 3,
                transitionDuration: 50,
                transitionInterpolator: mapBoxLinearInterpolator,
            })
        })
    }

    const inBounds = (point, bounds) => {
        const lng = (point.lng - bounds[0][0]) * (point.lng - bounds[1][0]) < 0
        const lat = (point.lat - bounds[0][1]) * (point.lat - bounds[1][1]) < 0
        return lng && lat
    }

    const updateStoresToDisplayExternalViewport = (externalViewport: any) => {
        if (
            externalViewport === undefined ||
            externalViewport.zoom < zoomChange ||
            isTransitionInProgress ||
            !handleUpdate
        ) {
            return
        }

        const webMercatorViewport = new WebMercatorViewport(
            externalViewport as any
        )
        const bounds = webMercatorViewport.getBounds()
        const st = stores.filter((x) => inBounds(x, bounds))

        setTimeout(() => {
            setIsTransitionInProgress(true)
        }, 1)
        setTimeout(() => {
            setStoresToDisplay(st)
            setIsTransitionInProgress(false)
        }, 10)
    }

    const updateStoresToDisplay = () => {
        updateStoresToDisplayExternalViewport(viewport)
    }

    const getMapStyle = () => {
        return {
            width: '100%',
            height: !isMobile ? '100%' : '260px',
        }
    }

    const zoomChange = 6.5
    return (
        <>
            <ReactMapGL
                ref={mapRef}
                mapboxApiAccessToken={mapboxApiAccessToken}
                mapStyle={mapStyleTheme}
                {...viewport}
                {...getMapStyle()}
                onViewportChange={handleViewportChange}
                onTransitionEnd={updateStoresToDisplay}
                onTouchEnd={updateStoresToDisplay}
                onMouseUp={updateStoresToDisplay}
                minZoom={2}
                onClick={onClick}
                getCursor={getCursor}
                onHover={onHover}
                scrollZoom={{
                    speed: 0.1,
                    smooth: false,
                }}
            >
                {viewport.zoom >= zoomChange &&
                    storesToDisplay.map((store, index) => {
                        return (
                            <CustomMarker
                                key={`store-${index}`}
                                marker={store}
                                openPopup={selectStore}
                                size="25px"
                            />
                        )
                    })}
                {viewport.zoom >= zoomChange &&
                    locationSelectedStore !== undefined && (
                        <CustomStorePopup
                            store={locationSelectedStore}
                            forSmallMarker={true}
                            closePopup={closeStorePopup}
                        />
                    )}
                {
                    <Source
                        id="stores"
                        type="geojson"
                        data={storesGeo}
                        cluster={true}
                        clusterMaxZoom={7}
                        clusterRadius={70}
                    >
                        <Layer maxzoom={zoomChange} {...clusterLayerShadow} />
                        <Layer maxzoom={zoomChange} {...clusterLayer} />
                        <Layer maxzoom={zoomChange} {...unclusterCountLayer} />
                        <Layer maxzoom={zoomChange} {...clusterCountLayer} />
                    </Source>
                }
                <NavigationControl
                    style={navControlStyle}
                    showCompass={false}
                />
            </ReactMapGL>
        </>
    )
}
