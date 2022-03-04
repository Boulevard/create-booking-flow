import { useEffect } from 'react'
import { Blvd, defaultLocationExternalId } from 'lib/sdk/blvd'
import {
    useCartIdState,
    useCartMethods,
    useCartState,
    useSetCartDataLoadedState,
    useSetDefaultBlvdLocationState,
} from 'lib/state/cart'
import { Cart, CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { getStepFromPath } from 'lib/utils/stepUtils'
import { useRouter } from 'next/router'
import { useSetPersonalInformationState } from 'lib/state/personal-info'
import { useUrlParams } from 'lib/sdk/hooks/useUrlParams'
import { useStaffTimes } from 'lib/state/staffTime'
import { useStores } from 'lib/sdk/hooks/useStores'
import { useFlowFactory } from 'components/molecules/CartInitializer/FlowFactory'

interface CartLocation {
    cart: Cart
    location?: Location
}

interface Info {
    cartLocation?: CartLocation
    locations?: Location[]
    selectedServices?: CartBookableItem[] | undefined
}

export const CartDefinition = () => {
    const router = useRouter()
    const cartState = useCartState()
    const cartIdState = useCartIdState()
    const { setStepForce, setRecoilStep } = useFlowStep()
    const setPersonalInformationState = useSetPersonalInformationState()
    const setCartDataLoadedState = useSetCartDataLoadedState()
    const { getUrlParams } = useUrlParams()
    const setDefaultBlvdLocationState = useSetDefaultBlvdLocationState()
    const { setLocations } = useStores()
    const {
        createCart,
        setCartCommonState,
        getPersonalInformation,
        forceLoadSelectedServices,
        loadSelectedStaff,
        loadBookingAnswers,
    } = useCartMethods()
    const { loadDatesAndTimes } = useStaffTimes()
    const { getMaxAvailableStep, getInitialStep, isCreateEmptyCart } =
        useFlowFactory()

    const setDefaultLocation = async (
        cartLocation: Location | undefined,
        locations: Location[] | undefined
    ): Promise<Location | undefined> => {
        const urlParams = getUrlParams()
        let result: Location | undefined
        if (
            !defaultLocationExternalId &&
            cartLocation &&
            cartLocation.externalId === urlParams.storeId
        ) {
            result = cartLocation
        } else if (
            locations &&
            (defaultLocationExternalId || urlParams.storeId)
        ) {
            const defaultBlvdLocation = locations.find(
                (x) => x.externalId === defaultLocationExternalId
            )
            const storeIdLocation = locations.find(
                (x) => x.externalId === urlParams.storeId
            )
            result = defaultBlvdLocation ?? storeIdLocation
        }
        if (result) {
            setDefaultBlvdLocationState(result)
        }
        return result
    }

    const getAndSetLocations = async () => {
        const locations = await Blvd.locations.list()
        setLocations(locations)
        return locations
    }

    const initFlow = async (): Promise<Info> => {
        const locations = await getAndSetLocations()
        const location = await setDefaultLocation(undefined, locations)
        if (location || isCreateEmptyCart()) {
            const cart = await createCart(location, undefined)
            return {
                cartLocation: {
                    cart: cart,
                    location: location,
                },
                locations: locations,
            }
        }
        return {
            locations: locations,
        }
    }

    const getRouteStep = async (
        cart: Cart,
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ): Promise<Step> => {
        const initialStep = getInitialStep(location, selectedServices)
        const routeStep = getStepFromPath(router.asPath, initialStep)
        const maxAvailableStep = getMaxAvailableStep(
            cart,
            location,
            selectedServices
        )
        if (routeStep > maxAvailableStep) {
            return maxAvailableStep
        } else {
            return routeStep
        }
    }

    const loadCartInternal = async (): Promise<Info> => {
        const urlParams = getUrlParams()

        const cart = await Blvd.carts.get(cartIdState)
        setPersonalInformationState(getPersonalInformation(cart))
        loadBookingAnswers(cart)
        const location = (await cart.getLocation()) ?? undefined
        if (
            (location &&
                urlParams &&
                urlParams.storeId &&
                urlParams.storeId !== location.externalId) ||
            (location === undefined && urlParams.storeId !== undefined)
        ) {
            throw new Error('StoreId mismatch')
        }

        await setDefaultLocation(location, undefined)
        const availableCategories = await setCartCommonState(
            cart,
            location,
            undefined
        )
        const selectedItems = await forceLoadSelectedServices(
            cart,
            availableCategories
        )
        await loadSelectedStaff(selectedItems)

        return {
            cartLocation: {
                cart,
                location,
            },
            selectedServices: selectedItems,
        }
    }

    const loadCart = async (): Promise<Info> => {
        try {
            return await loadCartInternal()
        } catch (ex) {
            return await initFlow()
        }
    }

    const manageFlow = async (): Promise<Step | undefined> => {
        if (cartState !== undefined) {
            return
        }

        let locations: Location[] | undefined
        let cartLocation: CartLocation | undefined
        let info: Info
        if (cartIdState === undefined) {
            info = await initFlow()
        } else {
            info = await loadCart()
        }

        cartLocation = info.cartLocation
        locations = info.locations
        const selectedServices = info.selectedServices

        let step: Step
        if (cartLocation) {
            const { cart, location } = cartLocation
            step = await getRouteStep(cart, location, selectedServices)
            if (step === Step.ChooseDate && location) {
                await loadDatesAndTimes(cart, location, new Date())
            }
        } else {
            step = getInitialStep(undefined, selectedServices)
        }
        if (!locations) {
            await getAndSetLocations()
        }
        return step
    }

    useEffect(() => {
        manageFlow()
            .then(async (step: Step | undefined) => {
                if (step === undefined) {
                    return
                }
                await setStepForce(step)
                setRecoilStep(step)
            })
            .finally(() => setCartDataLoadedState(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <></>
}
