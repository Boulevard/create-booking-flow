import React from 'react'
import { MapFactory } from 'components/molecules/Map/MapFactory'
import { useMobile } from 'lib/utils/useMobile'
import { useStores } from 'lib/sdk/hooks/useStores'

export const RightPanel = () => {
    const { isMobile } = useMobile()
    const { stores } = useStores()
    if (isMobile) {
        return <></>
    }
    return <MapFactory stores={stores} handleUpdate={!isMobile} />
}
