import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import { useSuccessBookingCartInfoState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import { CustomMarker } from 'components/molecules/Map/Mapbox/CustomMarker'
import { CustomStorePopup } from 'components/molecules/Map/Mapbox/CustomStorePopup'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { mapStyleTheme } from 'lib/utils/locationUtils'

const mapStyle = {
    width: '100%',
    height: '100%',
}

const navControlStyle = {
    right: 20,
    bottom: 50,
}

interface Props {
    isShowStorePopup?: boolean
    displayNavigationControl?: boolean
    markerSize?: number | string
}

export const SelectedStoreMap = ({
    isShowStorePopup = true,
    displayNavigationControl = false,
    markerSize,
}: Props) => {
    const mapRef = useRef(null)
    const { mapboxApiAccessToken } = useConfig()
    const successBookingCartInfo = useSuccessBookingCartInfoState()
    const cartStore = useCartStoreState()
    const selectedStore = cartStore ?? successBookingCartInfo?.store
    const [state, setState] = useState({ viewport: {} })

    useEffect(() => {
        setState({
            ...state,
            viewport: {
                latitude: selectedStore?.lat,
                longitude: selectedStore?.lng,
                zoom: 14,
            },
        })
        // eslint-disable-next-line
    }, [selectedStore])

    const handleViewportChange = useCallback(
        (viewport) => {
            setState({ ...state, viewport })
        },
        // eslint-disable-next-line
        []
    )

    const { viewport } = state
    return (
        <>
            {selectedStore && (
                <ReactMapGL
                    ref={mapRef}
                    mapboxApiAccessToken={mapboxApiAccessToken}
                    mapStyle={mapStyleTheme}
                    {...viewport}
                    {...mapStyle}
                    onViewportChange={handleViewportChange}
                >
                    <CustomMarker
                        key={`store-${selectedStore.location.id}`}
                        marker={selectedStore}
                        size={markerSize ? markerSize : '65px'}
                    />
                    {isShowStorePopup && (
                        <CustomStorePopup
                            store={selectedStore}
                            forSmallMarker={false}
                        />
                    )}
                    {displayNavigationControl && (
                        <NavigationControl
                            style={navControlStyle}
                            showCompass={false}
                        />
                    )}
                </ReactMapGL>
            )}
        </>
    )
}
