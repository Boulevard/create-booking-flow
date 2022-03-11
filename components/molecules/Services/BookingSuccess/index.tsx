import { Box, Button, Grid, Theme, Typography } from '@mui/material'
import { theme } from 'styles/theme'
import { makeStyles } from '@mui/styles'
import formatDateFns, { cartTimeToDate } from 'lib/utils/formatDateFns'
import getTimeZoneAbbr from 'lib/utils/getTimeZoneAbbr'
import { stepScreen } from 'constants/styles'
import { appExternalUrl, getAddress, getLocationName, getNavigationUrl, } from 'lib/utils/locationUtils'
import { SelectedStoreMap } from 'components/molecules/Map/Mapbox/SelectedStoreMap'
import { useCartMethods, useSuccessBookingCartInfoState } from 'lib/state/cart'
import { useMobile } from 'lib/utils/useMobile'
import { usePersonalInformationState } from 'lib/state/personal-info'
import { useSelectedServices } from 'lib/state/services'
import { useCartBookableItemListStaff } from 'lib/state/staff'
import { MapType, useAppConfig } from 'lib/state/config'
import { SelectedStoreMapGoogle } from 'components/molecules/Map/Google/SelectedStoreMapGoogle'
import { useConfig } from 'lib/sdk/hooks/useConfig'

interface StylesProps {
    isMobile: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: StylesProps) => ({
        ...stepScreen(theme).root(props.isMobile),
        paddingTop: !props.isMobile ? theme.spacing(8) : '86px',
    }),
}))

export default function BookingSuccess() {
    const appointmentBooked = 'Appointment Booked!'
    const orderComplete = 'Order complete!'
    const weLookForward = 'We look forward to seeing you! Please check your email for additional details'
    const thankYou = 'Thank you for your order! Please check your email for additional details.'

    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    const successBookingCartInfo = useSuccessBookingCartInfoState()
    const store = successBookingCartInfo?.store
    const startTime = successBookingCartInfo?.startTime
    const icsLink = successBookingCartInfo?.icsLink
    const locationTimeZone = store?.location.tz
    const timeZoneAbbr = getTimeZoneAbbr(locationTimeZone)
    const [personalInformation] = usePersonalInformationState()
    const { selectedServicesStateValue } = useSelectedServices()
    const { isCartAvailableBookableItem } = useCartMethods()
    const hasServices = selectedServicesStateValue.filter(x=>isCartAvailableBookableItem(x.item)).length > 0
    const selectedServicesName = selectedServicesStateValue.map(
        (service) => service.item.name
    )
    const { getMapType } = useAppConfig()
    const mapType = getMapType()
    const { googleMapsApiAccessToken, mapboxApiAccessToken } = useConfig()

    const cartBookableItemListStaff = useCartBookableItemListStaff()

    const onContinueShopping = () => {
        location.href = appExternalUrl
    }

    const onBack = () => {
        location.reload()
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    container
                    item
                    xs={12}
                    sm={9}
                    lg={6}
                    display="flex"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant={!isMobile ? 'h1' : 'h2'}>
                        {hasServices ? appointmentBooked : orderComplete}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ pt: 1, textAlign: 'center' }}
                    >
                        {hasServices ? weLookForward : thankYou}
                    </Typography>
                    <Box sx={{ mt: !isMobile ? 11 : 2, width: '100%' }}>
                        <Grid
                            container
                            sx={{
                                pb: 3,
                            }}
                        >
                            <Grid
                                item
                                xs={isMobile ? 12 : 4}
                                sx={{
                                    maxWidth: !isMobile ? 200 : 'auto',
                                    display: !isMobile ? 'block' : 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 200,
                                        maxWidth: 200,
                                        width: !isMobile ? 'auto' : 200,
                                    }}
                                >
                                    {!!mapboxApiAccessToken && mapType === MapType.MapBox &&
                                        <SelectedStoreMap
                                            isShowStorePopup={false}
                                            markerSize="33px"
                                        />
                                    }
                                    {!!googleMapsApiAccessToken && mapType === MapType.Google
                                        && <SelectedStoreMapGoogle/>
                                    }
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={isMobile ? 12 : 8}
                                sx={{ pl: 2, pt: !isMobile ? 0 : 5 }}
                            >
                                <Box
                                    sx={{
                                        pt: 1,
                                        pb: 2,
                                        pl: 2,
                                        pr: !isMobile ? 0 : 2,
                                        borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: !isMobile
                                                ? 'row'
                                                : 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h3"
                                                component="span"
                                                fontSize="16px"
                                                sx={{ pr: 2 }}
                                            >
                                                {getLocationName(store)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ pt: '5px' }}
                                            >
                                                {getAddress(store)}
                                            </Typography>
                                        </Box>
                                        <a
                                            href={getNavigationUrl(
                                                store?.location
                                            )}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    paddingTop: !isMobile
                                                        ? 0
                                                        : '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Get Directions
                                            </Typography>
                                        </a>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ pt: 2, pl: 2, pr: !isMobile ? 0 : 2 }}
                                >
                                    <Typography variant="h3">
                                        {`Appointment for ${personalInformation?.firstName} ${personalInformation?.lastName}`}
                                    </Typography>

                                    <Box sx={{ pt: 1 }}>
                                        {selectedServicesName?.map(
                                            (serviceName, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {serviceName}
                                                </Typography>
                                            )
                                        )}
                                    </Box>

                                    {hasServices && <Box sx={{ pt: 1 }}>
                                        <Typography variant="body1">
                                            {formatDateFns(
                                                cartTimeToDate(startTime),
                                                store?.location.tz,
                                                `${
                                                    !isMobile ? 'EEEE' : 'EEE'
                                                } MM/dd/yyyy`
                                            )}{' '}
                                            {formatDateFns(
                                                cartTimeToDate(startTime),
                                                store?.location.tz,
                                                "h:mmaaaaa'm' "
                                            )}
                                            {timeZoneAbbr}
                                        </Typography>
                                        {cartBookableItemListStaff?.filter(x=>selectedServicesStateValue.find(y=> y.id === x.cartBookableItemId))
                                            .map(
                                            (cartBookableItemStaff) => (
                                                <Typography
                                                    key={
                                                        cartBookableItemStaff.cartBookableItemId
                                                    }
                                                    variant="body1"
                                                >
                                                    {`With ${cartBookableItemStaff.staff.name}`}
                                                </Typography>
                                            )
                                        )}

                                        <a
                                            href={icsLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    pt: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Add to Calendar
                                            </Typography>
                                        </a>
                                    </Box>}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            mt: !isMobile ? 10 : 4,
                            width: 170,
                            height: 38,
                        }}
                        onClick={onContinueShopping}
                    >
                        Return to Website
                    </Button>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            mt: 3,
                            mb: 2,
                            cursor: 'pointer',
                        }}
                        onClick={onBack}
                    >
                        Book or purchase another
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
