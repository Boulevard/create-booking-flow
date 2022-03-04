import React from 'react'
import { Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FiX } from 'react-icons/fi'
import { getAddress } from 'lib/utils/locationUtils'
import { Store } from 'lib/state/store/types'
import { useMobile } from 'lib/utils/useMobile'

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
    closeIcon: {
        position: 'absolute',
        top: (props: StylesProps) => (!props.isMobile ? 13 : 4),
        right: (props: StylesProps) => (!props.isMobile ? 13 : 6),
        cursor: 'pointer',
    },
}))

interface Props {
    store: Store
    closePopup?: () => void
}

export const PopupCommon = ({ store, closePopup }: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    return (
        <>
            {!!closePopup && (
                <Box className={classes.closeIcon} onClick={closePopup}>
                    <FiX size={!isMobile ? 25 : 21} />
                </Box>
            )}
            {!isMobile && (
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                    Your store
                </Typography>
            )}
            <Typography variant="h3" sx={{ pt: !isMobile ? 1 : 0 }}>
                {store.location.name}
            </Typography>
            <Typography variant="body2" sx={{ pt: 1 }}>
                {getAddress(store)}
            </Typography>
        </>
    )
}
