import React from 'react'
import { Store } from 'lib/state/store/types'
import { MapStores } from 'components/molecules/Map/Google/MapStores'
import { MapType, useAppConfig } from 'lib/state/config'
import { MapView } from 'components/molecules/Map/Mapbox/MapView'

interface Props {
    stores: Store[]
    handleUpdate: boolean
}

export const MapFactory = ({ stores, handleUpdate }: Props) => {
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    return (
        <>
            {mapType === MapType.MapBox && (
                <MapView stores={stores} handleUpdate={handleUpdate} />
            )}
            {mapType === MapType.Google && <MapStores stores={stores} />}
        </>
    )
}
