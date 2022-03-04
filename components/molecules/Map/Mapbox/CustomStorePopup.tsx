import React from 'react'
import { Popup } from 'react-map-gl'
import { makeStyles } from '@mui/styles'
import { Store } from 'lib/state/store/types'
import { useMobile } from 'lib/utils/useMobile'
import { PopupCommon } from 'components/molecules/Map/PopupCommon'

interface StylesProps {
    isMobile: boolean
}

const useStyles = makeStyles(() => ({
    popup: {
        maxWidth: (props: StylesProps) => (!props.isMobile ? '275px' : '214px'),
        '& .mapboxgl-popup-content': {
            filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.15))',
            padding: (props: StylesProps) =>
                !props.isMobile ? '16px' : '14px 33px 14px 16px',
        },
        '& .mapboxgl-popup-tip': {
            borderWidth: '20px !important',
        },
        '& .mapboxgl-popup-close-button': {
            fontFamily: 'sans-serif',
            fontSize: (props: StylesProps) =>
                !props.isMobile ? '33px' : '27px',
            fontWeight: 300,
            position: 'absolute',
            top: '-5px',
            right: '2px',
            '&:hover': {
                backgroundColor: 'rgb(255 255 255 / 0%)',
            },
        },
    },
}))

interface Props {
    store: Store
    forSmallMarker: boolean
    closePopup?: () => void
}

export const CustomStorePopup = ({
    store,
    forSmallMarker,
    closePopup,
}: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    return (
        <Popup
            latitude={store.lat}
            longitude={store.lng}
            closeButton={false}
            offsetTop={forSmallMarker ? -30 : -80}
            className={classes.popup}
        >
            <PopupCommon closePopup={closePopup} store={store} />
        </Popup>
    )
}
