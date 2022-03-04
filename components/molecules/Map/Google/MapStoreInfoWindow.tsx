import { Store as StoreType } from 'lib/state/store/types'
import { Box } from '@mui/material'
import React from 'react'
import { PopupCommon } from 'components/molecules/Map/PopupCommon'
import { useMapStoreInfoWindowStyles } from 'components/molecules/Map/Google/styles'

interface Props {
    store: StoreType
    closePopup?: () => void
}

export const MapStoreInfoWindow = ({ store, closePopup }: Props) => {
    const classes = useMapStoreInfoWindowStyles()
    return (
        <Box className={classes.container}>
            <Box className={classes.popup}>
                <PopupCommon closePopup={closePopup} store={store} />
            </Box>
            <Box className={classes.bottomArrow} />
        </Box>
    )
}
