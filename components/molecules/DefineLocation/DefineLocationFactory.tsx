import { MapType, useAppConfig } from 'lib/state/config'
import React from 'react'
import { MapboxDefineLocation } from 'components/molecules/DefineLocation/Mapbox/MapboxDefineLocation'
import { GoogleDefineLocation } from 'components/molecules/DefineLocation/Google/GoogleDefineLocation'
import { useConfig } from 'lib/sdk/hooks/useConfig'

export const DefineLocationFactory = ({ onSelected }) => {
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    const { mapboxApiAccessToken, googleMapsApiAccessToken } = useConfig()
    return (
        <>
            {mapType === MapType.MapBox && !!mapboxApiAccessToken && (
                <MapboxDefineLocation onSelected={onSelected} />
            )}
            {mapType === MapType.Google && !!googleMapsApiAccessToken && (
                <GoogleDefineLocation onSelected={onSelected} />
            )}
        </>
    )
}
