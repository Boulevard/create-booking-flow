import React from 'react'
import { Typography } from '@mui/material'
import { getLocationName } from 'lib/utils/locationUtils'
import { useCartStoreState } from 'lib/state/store'
import { useDefaultBlvdLocationState } from 'lib/state/cart'
import { Step } from 'lib/state/booking-flow/types'
import { SummaryItemBase } from 'components/atoms/layout/summary/SummaryItemBase'

export const Location = () => {
    const selectedStore = useCartStoreState()
    const defaultBlvdLocationState = useDefaultBlvdLocationState()
    if (!selectedStore) {
        return <></>
    }
    return (
        <SummaryItemBase
            isEditable={!defaultBlvdLocationState}
            step={Step.ChooseLocation}
        >
            <Typography variant="body2">
                {getLocationName(selectedStore)}
            </Typography>
        </SummaryItemBase>
    )
}
