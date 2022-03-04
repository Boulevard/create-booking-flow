import { MapType, useAppConfig } from 'lib/state/config'
import React from 'react'
import { MapboxDefineLocation } from 'components/molecules/DefineLocation/Mapbox/MapboxDefineLocation'
import { GoogleDefineLocation } from 'components/molecules/DefineLocation/Google/GoogleDefineLocation'

export const DefineLocationFactory = ({ onSelected }) => {
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    return (
        <>
            {mapType === MapType.MapBox && (
                <MapboxDefineLocation onSelected={onSelected} />
            )}
            {mapType === MapType.Google && (
                <GoogleDefineLocation onSelected={onSelected} />
            )}
        </>
    )
}
