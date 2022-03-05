import GoogleMapReact from 'google-map-react'
import { MapStore } from 'components/molecules/Map/Google/MapStore'
import { Store } from 'lib/state/store/types'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { useMapViewportState } from 'lib/state/location'

interface Props {
    stores: Store[]
}

export const MapStores = ({ stores }: Props) => {
    const { googleMapsApiAccessToken } = useConfig()
    const [globalViewport] = useMapViewportState()
    const defaultProps = {
        center: { lat: globalViewport.latitude, lng: globalViewport.longitude },
        zoom: globalViewport.zoom,
    }
    return (
        <>
            <GoogleMapReact
                bootstrapURLKeys={{ key: googleMapsApiAccessToken }}
                center={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    fullscreenControl: false,
                    gestureHandling: 'greedy',
                    clickableIcons: false,
                }}
            >
                {stores?.map((store) => (
                    <MapStore
                        key={'MapStore' + store.location.id}
                        lat={store.lat}
                        lng={store.lng}
                        store={store}
                    />
                ))}
            </GoogleMapReact>
        </>
    )
}
