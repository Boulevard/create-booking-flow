import React from 'react'
import { Marker } from 'react-map-gl'
import { Box } from '@mui/material'
import { Store } from 'lib/state/store/types'
import { MapPinIcon } from '../../../icons/MapPinIcon'

interface Props {
    marker: Store
    openPopup?: (store: Store) => void
    size?: number | string
}

export const CustomMarker = ({ marker, openPopup, size = 65 }: Props) => {
    const onMarkerClick = () => {
        if (openPopup) {
            openPopup!(marker)
        }
    }
    return (
        <Marker longitude={marker.lng} latitude={marker.lat}>
            <Box
                onClick={onMarkerClick}
                sx={{
                    position: 'relative',
                    top: `-${size}`,
                    left: '-50%',
                    '& svg': {
                        width: size,
                        height: size,
                    },
                    cursor: 'pointer',
                }}
            >
                <MapPinIcon />
            </Box>
        </Marker>
    )
}

export default CustomMarker
