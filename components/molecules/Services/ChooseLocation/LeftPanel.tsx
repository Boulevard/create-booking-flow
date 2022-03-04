import { Box, Typography } from '@mui/material'
import { DefineLocationFactory } from 'components/molecules/DefineLocation/DefineLocationFactory'
import { colors } from 'constants/colors'
import { MapFactory } from 'components/molecules/Map/MapFactory'
import { StoreList } from 'components/molecules/Services/ChooseLocation/StoreList'
import { useMobile } from 'lib/utils/useMobile'
import { useIsShowMap } from 'lib/state/location'
import { useLeftPanel } from 'components/molecules/Services/ChooseLocation/useLeftPanel'
import { GetLocation } from 'components/molecules/GeoLocation'
import { useLeftPanelStyles } from 'components/molecules/Services/ChooseLocation/useStyles'
import Font from 'config/fonts.json'

export const LeftPanel = () => {
    const { isMobile } = useMobile()
    const {onSelected, stores, orderStores, onUserLocationChange} = useLeftPanel()
    const [isShowMap] = useIsShowMap()
    const classes = useLeftPanelStyles({ isMobile })
    return (
        <Box className={classes.locationBlock}>
            <GetLocation onUserLocationChange={onUserLocationChange} />
            <Box
                className={`${
                    isMobile ? classes.mobileSearchBlock : classes.searchBlock
                }`}
            >
                <Typography
                    variant="h2"
                    component="span"
                    fontFamily={Font.headings_family}
                >
                    Select a store location
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <DefineLocationFactory onSelected={onSelected} />
                </Box>
            </Box>
            {isMobile && isShowMap && (
                <Box
                    sx={{
                        marginTop: '107px',
                        backgroundColor: colors.map.backgroundColor,
                    }}
                >
                    <MapFactory stores={stores} handleUpdate={isMobile} />
                </Box>
            )}
            <Box
                sx={{
                    height: !isMobile ? 'calc(100% - 108px)' : 'auto',
                    marginTop: isMobile && !isShowMap ? '107px' : 'auto',
                }}
            >
                <StoreList stores={orderStores} />
            </Box>
        </Box>
    )
}
