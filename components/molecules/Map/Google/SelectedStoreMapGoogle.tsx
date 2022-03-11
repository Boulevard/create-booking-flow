import { useSuccessBookingCartInfoState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { MapStore } from 'components/molecules/Map/Google/MapStore'
import GoogleMapReact from 'google-map-react'

export const SelectedStoreMapGoogle = () => {
    const { googleMapsApiAccessToken } = useConfig()
    const successBookingCartInfo = useSuccessBookingCartInfoState()
    const cartStore = useCartStoreState()
    const selectedStore = cartStore ?? successBookingCartInfo?.store
    const defaultProps = {
        center: { lat: selectedStore?.lat ?? 0, lng: selectedStore?.lng ?? 0 },
        zoom: 14,
    }

    return (
        <>
            {selectedStore && (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapsApiAccessToken }}
                    center={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    options={{
                        fullscreenControl: false,
                        gestureHandling: 'greedy',
                        clickableIcons: false,
                        zoomControl: false,
                    }}
                >
                    <MapStore
                        key={'MapStore' + selectedStore.location.id}
                        lat={selectedStore.lat}
                        lng={selectedStore.lng}
                    />
                </GoogleMapReact>
            )}
        </>
    )
}
