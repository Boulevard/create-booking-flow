import { Typography } from '@mui/material'
import { useIsLocationAccessAllowed } from 'lib/state/currentPosition'
import { Store } from 'lib/state/store/types'

interface Props {
    store: Store | undefined
}

export const LocationDistance = ({ store }: Props) => {
    const isLocationAccessAllowed = useIsLocationAccessAllowed()
    return (
        <>
            {isLocationAccessAllowed && (
                <Typography
                    variant="body1"
                    component="span"
                    sx={{ pl: 1 }}
                >{`${store?.distance} mi`}</Typography>
            )}
        </>
    )
}
