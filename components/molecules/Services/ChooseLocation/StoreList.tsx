import React from 'react'
import { Store } from 'lib/state/store/types'
import { SelectStore } from 'components/molecules/Services/ChooseLocation/SelectStore'
import BounceLoader from 'react-spinners/BounceLoader'
import { Box } from '@mui/material'
import { useMobile } from 'lib/utils/useMobile'
import { useIsLocationAccessAnsweredByUser } from 'lib/state/currentPosition'
import { useStoreListStyles } from 'components/molecules/Services/ChooseLocation/useStyles'

interface Props {
    stores: Store[]
}

export const StoreList = ({ stores }: Props) => {
    const { isMobile } = useMobile()
    const isLocationAccessAnsweredByUser = useIsLocationAccessAnsweredByUser()
    const classes = useStoreListStyles({ isMobile, isLocationAccessAnsweredByUser })

    return (
        <Box className={classes.selectStoresBlock}>
            {isLocationAccessAnsweredByUser &&
                stores.map((store) => (
                    <SelectStore key={store.location.id} store={store} />
                ))}
            {!isLocationAccessAnsweredByUser && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: 'calc(50% - 30px)',
                        top: 'calc(50% - 30px)',
                    }}
                >
                    <BounceLoader color="#dadada" size={60} />
                </Box>
            )}
        </Box>
    )
}
