import { Typography, Box, Button } from '@mui/material'
import { Store } from 'lib/state/store/types'
import { Step } from 'lib/state/booking-flow/types'
import {
    getAddress,
    getLocationName,
    limitedMapBoxFlyToInterpolator,
} from 'lib/utils/locationUtils'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { useFlowStep } from 'lib/state/booking-flow'
import {
    useLocationSelectedStoreState,
    useMapView,
    useSetMapViewportState,
    useSetUpdateStoresViewportState,
} from 'lib/state/location'
import { useMobile } from 'lib/utils/useMobile'
import { LocationDistance } from 'components/molecules/Services/ChooseLocation/LocationDistance'
import { LayoutListItem } from 'components/atoms/layout/LayoutListItem'
import { FlowType, useAppConfig } from 'lib/state/config'
import { useCartStoreState } from 'lib/state/store'
import { useIsShowMap } from 'lib/state/location'
import {
    useLastSelectedBookableItem,
    useResetLastSelectedBookableItem,
    useSelectedServices,
} from 'lib/state/services'
import { useContext } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

interface Props {
    store: Store | undefined
}

export const SelectStore = ({ store }: Props) => {
    const { isMobile } = useMobile()
    const [isShowMap] = useIsShowMap()
    const { createCart, setCartLocation, loadSelectedServices } =
        useCartMethods()
    const { setStep } = useFlowStep()
    const setMapViewportState = useSetMapViewportState()
    const { getMapViewportState } = useMapView()
    const setUpdateStoresState = useSetUpdateStoresViewportState()
    const [locationSelectedStore, setLocationSelectedStore] =
        useLocationSelectedStoreState()
    const { getFlowType } = useAppConfig()
    const flowType = getFlowType()
    const cart = useCartState()
    const cartStore = useCartStoreState()
    const { selectedServicesStateValue } = useSelectedServices()
    const lastSelectedBookableItem = useLastSelectedBookableItem()
    const resetLastSelectedBookableItem = useResetLastSelectedBookableItem()
    const layout = useContext(LayoutContext)

    const continueSelectLocationFirst = async () => {
        const location = store?.location
        await createCart(location, store)
        await setStep(Step.SelectService)
    }

    const continueSelectServiceFirst = async () => {
        if (!cart || !store) {
            return
        }
        const selectedServices = await setCartLocation(
            cart,
            store,
            cartStore,
            lastSelectedBookableItem,
            selectedServicesStateValue
        )
        await loadSelectedServices(cart, selectedServices)
        resetLastSelectedBookableItem()
        await setStep(Step.SelectedServices)
    }

    const onContinue = async () => {
        layout.setIsShowLoader(true)
        if (store?.location === undefined) {
            return
        }

        try {
            if (flowType === FlowType.SelectLocationFirst) {
                await continueSelectLocationFirst()
            } else {
                await continueSelectServiceFirst()
            }
        } catch {
            layout.setIsShowLoader(false)
        }
    }

    const onSelect = async () => {
        if (!isMobile || isShowMap) {
            const viewport = getMapViewportState()
            let zoom = 8
            if (viewport) {
                zoom =
                    isNaN(viewport?.zoom) || viewport.zoom < zoom
                        ? zoom
                        : viewport.zoom
            }
            const currentViewport = {
                ...viewport,
                longitude: store?.lng!,
                latitude: store?.lat!,
                transitionDuration: 'auto',
                transitionInterpolator: limitedMapBoxFlyToInterpolator,
                zoom: zoom,
            }

            setLocationSelectedStore(store)
            setMapViewportState(currentViewport)
            setUpdateStoresState(currentViewport)

            if (isMobile) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                })
            }
        }
    }

    const storeSelected =
        locationSelectedStore?.location?.id === store?.location?.id

    return (
        <LayoutListItem
            id={store?.location.id}
            selected={!isMobile || isShowMap ? storeSelected : undefined}
            onClick={onSelect}
            useDefaultCursor={isMobile && !isShowMap}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Box>
                    <Typography variant="h3" component="span">
                        {getLocationName(store)}
                    </Typography>
                    <LocationDistance store={store} />
                </Box>
                <Box sx={{ pt: 1 }}>
                    <Typography variant="body2">{getAddress(store)}</Typography>
                </Box>
            </Box>

            <Button
                variant="contained"
                sx={{
                    width: 125,
                    height: 38,
                    mt: 2,
                    fontSize: '16px',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                }}
                onClick={onContinue}
            >
                Select Store
            </Button>
        </LayoutListItem>
    )
}
