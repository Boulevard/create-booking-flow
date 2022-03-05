import React from 'react'
import { Store } from 'lib/state/store/types'
import { MapStores } from 'components/molecules/Map/Google/MapStores'
import { MapType, useAppConfig } from 'lib/state/config'
import { MapView } from 'components/molecules/Map/Mapbox/MapView'
import { useConfig } from 'lib/sdk/hooks/useConfig'

interface Props {
    stores: Store[]
    handleUpdate: boolean
}

export const MapFactory = ({ stores, handleUpdate }: Props) => {
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    const { mapboxApiAccessToken, googleMapsApiAccessToken } = useConfig()
    return (
        <>
            {mapType === MapType.MapBox && !!mapboxApiAccessToken && (
                <MapView stores={stores} handleUpdate={handleUpdate} />
            )}
            {mapType === MapType.Google && !!googleMapsApiAccessToken && <MapStores stores={stores} />}
        </>
    )
}
