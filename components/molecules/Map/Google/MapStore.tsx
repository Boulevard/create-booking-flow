import { Store as StoreType } from 'lib/state/store/types'
import { isMobile } from 'react-device-detect'
import { MapStoreInfoWindow } from 'components/molecules/Map/Google/MapStoreInfoWindow'
import { MapPinIcon } from 'components/icons/MapPinIcon'
import React from 'react'
import { Box } from '@mui/material'
import { useLocationSelectedStoreState } from 'lib/state/location'
import { scrollIntoStore } from 'components/molecules/Map/helper'

interface Props {
    store?: StoreType|undefined
    lat: number
    lng: number
}

export const MapStore = ({ store }: Props) => {
    const [locationSelectedStore, setLocationSelectedStore] =
        useLocationSelectedStoreState()

    const onSelectClick = async (event?) => {
        if (!store) {
            return
        }

        event?.preventDefault()
        setLocationSelectedStore(store)
        scrollIntoStore(isMobile, store)
    }

    const size = '25px'

    const closeStorePopup = () => {
        setLocationSelectedStore(undefined)
    }
    return (
        <>
            {store && locationSelectedStore?.location.id === store.location.id && (
                <MapStoreInfoWindow
                    store={store}
                    closePopup={closeStorePopup}
                />
            )}
            <Box
                onClick={onSelectClick}
                sx={{
                    position: 'relative',
                    '& svg': {
                        width: size,
                        height: size,
                    },
                    cursor: 'pointer',
                }}
            >
                <MapPinIcon style={{ transform: 'translate(-50%, -100%)' }} />
            </Box>
        </>
    )
}
