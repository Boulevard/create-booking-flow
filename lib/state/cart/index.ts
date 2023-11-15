// @ts-nocheck - FIXME - Types in this file are broken, and this needs a heavy refactor
import {
    atom,
    useRecoilCallback,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil'
import { getPersistedState, makePersistedSetRecoilState } from '../persistence'
import { SuccessBookingCartInfo } from './types'
import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import {
    Cart,
    CartAvailableBookableItem,
    CartAvailableCategory,
    CartBookableItem,
    CartBookableTime,
} from '@boulevard/blvd-book-sdk/lib/cart'
import { Blvd } from 'lib/sdk/blvd'
import { useSetBookingAnswersState } from 'lib/state/booking-answers'
import { useSetPersonalInformationState } from 'lib/state/personal-info'
import { useStores } from 'lib/sdk/hooks/useStores'
import {
    useAvailableBookableItemStoresState,
    useResetCartStoreState,
    useSetAvailableBookableItemStoresState,
    useSetCartStoreState,
} from 'lib/state/store'
import { PersonalInformation } from 'lib/state/personal-info/types'
import { cartTimeToDate } from 'lib/utils/formatDateFns'
import { useAnalyticsService } from 'lib/analytics-api/analyticsService'
import { AvailableBookableItemStores, Store } from 'lib/state/store/types'
import { useResetStaffDatesStore } from 'lib/state/staffDate'
import {
    useResetSelectedStaffTimeState,
    useResetStaffTimesState,
} from 'lib/state/staffTime'
import {
    useMapView,
    useResetLocationSelectedStoreState,
    useSetLocationSelectedStoreState,
    useSetMapViewportState,
} from 'lib/state/location'
import {
    defaultZoom,
    mapBoxFlyToInterpolator,
    mapBoxTransitionDuration,
} from 'lib/utils/locationUtils'
import {
    useResetSelectedCartAvailableCategory,
    useSelectedServices,
    useSetActiveSelectedService,
    useSetAvailableCategories,
    useSetSelectedCartAvailableCategory,
} from 'lib/state/services'
import {
    CartAvailableBookableItemLocationVariant,
    CartAvailableBookableItemOption,
    CartAvailableItem,
    CartAvailablePurchasableItem,
} from '@boulevard/blvd-book-sdk/lib/carts/items'
import { CartBookableItemStaff, Staff } from 'lib/state/staff/types'
import {
    cartAvailableBookableItemStaffVariantToStaff,
    useSetAllowChooseStaffError,
    useSetBookableStaffVariants,
    useSetCartBookableItemListStaff,
} from 'lib/state/staff'
import { CartBookingQuestion } from '@boulevard/blvd-book-sdk/lib/carts/bookingQuestions'

const CART_ID_KEY = 'CART_ID'

const cartState = atom<Cart | undefined>({
    key: 'cartState',
    default: undefined,
})

const successBookingCartInfoState = atom<SuccessBookingCartInfo | undefined>({
    key: 'successBookingCartInfoState',
    default: undefined,
})

export const cartIdState = atom<string | undefined>({
    key: 'cartIdState',
    default: getPersistedState(CART_ID_KEY) ?? undefined,
})

export const defaultBlvdLocationState = atom<Location | undefined>({
    key: 'defaultBlvdLocationState',
    default: undefined,
})

export const cartDataLoaded = atom<boolean>({
    key: 'cartDataLoaded',
    default: false,
})

export const useCartState = () => useRecoilValue(cartState)
export const useSetCartState = () => useSetRecoilState(cartState)

export const useCartIdState = () => useRecoilValue(cartIdState)
export const useSetCartIdState = makePersistedSetRecoilState(
    CART_ID_KEY,
    cartIdState
)

export const useDefaultBlvdLocationState = () =>
    useRecoilValue(defaultBlvdLocationState)
export const useSetDefaultBlvdLocationState = () =>
    useSetRecoilState(defaultBlvdLocationState)

export const useSuccessBookingCartInfoState = () =>
    useRecoilValue(successBookingCartInfoState)
export const useSetSuccessBookingCartInfoState = () =>
    useSetRecoilState(successBookingCartInfoState)

export interface CartServices {
    cart: Cart
    services: CartBookableItem[]
}

export const useCartMethods = () => {
    const setCart = useSetCartState()
    const setCartIdState = useSetCartIdState()
    const setBookingAnswers = useSetBookingAnswersState()
    const setPersonalInformationState = useSetPersonalInformationState()
    const { getStoreFromLocation, setLocations } = useStores()
    const setCartStoreState = useSetCartStoreState()
    const resetCartStoreState = useResetCartStoreState()
    const setLocationSelectedStoreState = useSetLocationSelectedStoreState()
    const resetLocationSelectedStoreState = useResetLocationSelectedStoreState()
    const { appointmentTimeSelected } = useAnalyticsService()
    const resetStaffDatesStore = useResetStaffDatesStore()
    const resetStaffTimesState = useResetStaffTimesState()
    const resetSelectedStaffTimeState = useResetSelectedStaffTimeState()
    const { getMapViewportState } = useMapView()
    const setViewport = useSetMapViewportState()
    const setAvailableCategories = useSetAvailableCategories()
    const {
        loadSelectedServicesFromCart,
        reverseSelectedServices,
        selectedCartAvailableItemsStateValue,
        setSelectedCartAvailableItemsState,
    } = useSelectedServices()
    const setActiveSelectedService = useSetActiveSelectedService()
    const setBookableStaffVariants = useSetBookableStaffVariants()
    const setAllowChooseStaffError = useSetAllowChooseStaffError()
    const setCartBookableItemListStaff = useSetCartBookableItemListStaff()
    const availableBookableItemStores = useAvailableBookableItemStoresState()
    const setAvailableBookableItemStores =
        useSetAvailableBookableItemStoresState()
    const setSelectedCartAvailableCategory =
        useSetSelectedCartAvailableCategory()
    const resetSelectedCartAvailableCategory =
        useResetSelectedCartAvailableCategory()

    const isCartAvailableBookableItem = (
        availableItem: CartAvailableItem | undefined
    ) => {
        return (
            availableItem &&
            availableItem['__typename'] === 'CartAvailableBookableItem'
        )
    }

    const isCartAvailablePurchasableItem = (
        availableItem: CartAvailableItem | undefined
    ) => {
        return (
            availableItem &&
            availableItem['__typename'] === 'CartAvailablePurchasableItem'
        )
    }

    const addRemoveServiceCommon = async (
        cart: Cart,
        selectedCartAvailableItems: CartAvailableItem[]
    ): Promise<CartServices> => {
        setCart(cart)
        const services = await loadSelectedServicesFromCart(
            cart,
            selectedCartAvailableItems
        )
        resetStaffDatesStore()
        resetStaffTimesState()
        resetSelectedStaffTimeState()
        return { cart, services }
    }

    const addService = async (
        cart: Cart,
        availableItem: CartAvailableItem
    ): Promise<CartServices> => {
        if (isCartAvailablePurchasableItem(availableItem)) {
            cart = await cart.addPurchasableItem(
                availableItem as CartAvailablePurchasableItem
            )
        } else {
            cart = await cart.addBookableItem(
                availableItem as CartAvailableBookableItem
            )
        }
        const selectedCartAvailableItems =
            selectedCartAvailableItemsStateValue.concat(availableItem)
        setSelectedCartAvailableItemsState(selectedCartAvailableItems)
        return await addRemoveServiceCommon(cart, selectedCartAvailableItems)
    }

    const removeService = async (
        cart: Cart,
        bookableItem: CartBookableItem
    ): Promise<CartServices> => {
        cart = await cart.removeSelectedItem(bookableItem)
        const selectedCartAvailableItems: CartAvailableItem[] = []
        let wasFound = false
        for (let item of selectedCartAvailableItemsStateValue) {
            if (!wasFound && item.id === bookableItem.id) {
                wasFound = true
                continue
            }

            selectedCartAvailableItems.push(item)
        }
        setSelectedCartAvailableItemsState(selectedCartAvailableItems)
        return await addRemoveServiceCommon(cart, selectedCartAvailableItems)
    }

    const addAddon = async (
        cart: Cart,
        bookableItem: CartBookableItem,
        option: CartAvailableBookableItemOption
    ) => {
        const options = bookableItem.selectedOptions
        cart = await bookableItem.update({
            options: [...options, option],
            staffVariant: bookableItem.selectedStaffVariant,
        })
        return await addRemoveServiceCommon(
            cart,
            selectedCartAvailableItemsStateValue
        )
    }

    const removeAddon = async (
        cart: Cart,
        bookableItem: CartBookableItem,
        option: CartAvailableBookableItemOption
    ) => {
        const options = bookableItem.selectedOptions
        cart = await bookableItem.update({
            options: [...options.filter((opt) => opt.id !== option.id)],
        })
        return await addRemoveServiceCommon(
            cart,
            selectedCartAvailableItemsStateValue
        )
    }

    const selectStaff = async (
        cart: Cart,
        bookableItem: CartBookableItem,
        staff: Staff | undefined
    ) => {
        cart = await bookableItem.update({
            options: bookableItem.selectedOptions,
            staffVariant: staff?.staffVariant ?? { id: null },
        })
        return await addRemoveServiceCommon(
            cart,
            selectedCartAvailableItemsStateValue
        )
    }

    const setLocationBasedElements = async (
        location: Location | undefined,
        store: Store | undefined
    ) => {
        if (location === undefined) {
            resetCartStoreState()
            resetLocationSelectedStoreState()
            return
        }
        let locationStore = store
        if (locationStore === undefined) {
            locationStore = await getStoreFromLocation(location)
        }
        setCartStoreState(locationStore)
        setLocationSelectedStoreState(locationStore)
        const viewport = getMapViewportState()
        const updatedViewPort = {
            ...viewport,
            ...{
                longitude: locationStore.location.coordinates?.longitude ?? 0,
                latitude: locationStore.location.coordinates?.latitude ?? 0,
                zoom: defaultZoom,
                transitionDuration: mapBoxTransitionDuration,
                transitionInterpolator: mapBoxFlyToInterpolator,
            },
        }
        setViewport(updatedViewPort)
    }

    const setCartCommonState = async (
        cart: Cart,
        location: Location | undefined,
        store: Store | undefined
    ): Promise<CartAvailableCategory[]> => {
        setCart(cart)
        const cartCategories = (await cart.getAvailableCategories()).filter(
            (x) => x.name !== 'Gift Cards'
        )
        setAvailableCategories(cartCategories)
        await setLocationBasedElements(location, store)
        if (cartCategories?.length) {
            setSelectedCartAvailableCategory(cartCategories[0])
        }
        return cartCategories
    }

    const createCart = async (
        location?: Location | undefined,
        store?: Store | undefined
    ): Promise<Cart> => {
        const cart = await Blvd.carts.create(location)
        setCartIdState(cart.id)
        setBookingAnswers([])
        setPersonalInformationState({
            firstName: '',
            email: '',
            lastName: '',
            phone: '',
        })
        resetStaffDatesStore()
        resetStaffTimesState()
        await setCartCommonState(cart, location, store)
        return cart
    }

    const getCartDataLoadedState = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                let loadable = snapshot.getLoadable(cartDataLoaded)
                return loadable.valueMaybe()
            },
        []
    )

    const reserveBookableTime = async (
        cart: Cart | undefined,
        cartBookableTime: CartBookableTime | undefined,
        cartStoreState: Store | undefined
    ) => {
        if (!cart || !cartBookableTime) {
            return
        }
        const updatedCart = await cart?.reserveBookableItems(cartBookableTime)
        setCart(updatedCart)
        appointmentTimeSelected({
            location: cartStoreState?.location,
        }).then() //don't wait for op to be completed
    }

    const getAnswer = (bookingQuestion: CartBookingQuestion): any => {
        let answer = bookingQuestion.answer
        if (bookingQuestion.valueType === 'SELECT') {
            answer = bookingQuestion.answer?.option
        }
        if (bookingQuestion.valueType === 'BOOLEAN') {
            answer = bookingQuestion.answer?.booleanValue
        }
        if (bookingQuestion.valueType === 'DATETIME') {
            answer = cartTimeToDate(bookingQuestion.answer?.datetimeValue)
        }
        if (bookingQuestion.valueType === 'TEXT') {
            answer = bookingQuestion.answer?.textValue
        }
        return answer === null ? undefined : answer
    }

    const loadBookingAnswers = (cart: Cart) => {
        for (let question of cart.bookingQuestions) {
            if (!question.answer) {
                continue
            }
            setBookingAnswers((bookingAnswers) => [
                ...bookingAnswers.filter((q) => q.questionId !== question.id),
                {
                    questionId: question.id,
                    answer: getAnswer(question),
                },
            ])
        }
    }

    const getPersonalInformation = (cart: Cart): PersonalInformation => {
        return {
            email: cart.clientInformation?.email ?? '',
            phone: cart.clientInformation?.phoneNumber.substring(2) ?? '',
            firstName: cart.clientInformation?.firstName ?? '',
            lastName: cart.clientInformation?.lastName ?? '',
        }
    }

    const resetCategories = async () => {
        resetSelectedCartAvailableCategory()
    }

    const loadSelectedServices = async (
        cart: Cart,
        servicesFromCart: CartBookableItem[],
        selectedCartAvailableCategory?: CartAvailableCategory | undefined
    ) => {
        const services = reverseSelectedServices(servicesFromCart)
        if (services.length === 0) {
            return
        }
        const activeService = services[0]
        setActiveSelectedService(activeService)

        if (isCartAvailableBookableItem(activeService.item)) {
            const staffs = await activeService.item.getStaffVariants()
            setBookableStaffVariants(
                staffs.flatMap((z) =>
                    cartAvailableBookableItemStaffVariantToStaff(z)
                )
            )
        } else {
            setBookableStaffVariants([])
        }
        setAllowChooseStaffError(false)
        if (selectedCartAvailableCategory) {
            setSelectedCartAvailableCategory(selectedCartAvailableCategory)
        }
    }

    const getSelectedCartAvailableCategoryFromSelectedServices = (
        servicesFromCart: CartBookableItem[],
        availableCategories: CartAvailableCategory[]
    ) => {
        let selectedCartAvailableCategory: CartAvailableCategory | undefined =
            undefined

        if (servicesFromCart.length === 0) {
            return {
                selectedCartAvailableCategory: selectedCartAvailableCategory,
            }
        }

        selectedCartAvailableCategory = availableCategories.find((pc) =>
            pc.availableItems.some((i) => i.id === servicesFromCart[0].item.id)
        )
        return {
            selectedCartAvailableCategory: selectedCartAvailableCategory,
        }
    }

    const forceLoadSelectedServices = async (
        cart: Cart,
        availableCategories: CartAvailableCategory[]
    ) => {
        const servicesFromCart = await loadSelectedServicesFromCart(cart, [])
        const { selectedCartAvailableCategory } =
            getSelectedCartAvailableCategoryFromSelectedServices(
                servicesFromCart,
                availableCategories
            )
        await loadSelectedServices(
            cart,
            servicesFromCart,
            selectedCartAvailableCategory
        )
        return servicesFromCart
    }

    const loadSelectedStaff = async (servicesFromCart: CartBookableItem[]) => {
        const staffs: CartBookableItemStaff[] = []
        for (let selectedItem of servicesFromCart) {
            if (selectedItem.selectedStaffVariant) {
                staffs.push({
                    cartBookableItemId: selectedItem.id,
                    staff: cartAvailableBookableItemStaffVariantToStaff(
                        selectedItem.selectedStaffVariant
                    ),
                })
            }
        }
        setCartBookableItemListStaff(staffs)
    }

    const loadStoresForCartBookableItems = async (
        selectedBookableItems: CartBookableItem[],
        lastSelectedItem: CartAvailableBookableItem
    ) => {
        let locations: CartAvailableBookableItemLocationVariant[] | undefined =
            undefined
        const cartAvailableBookableItems = selectedBookableItems.map(
            (i) => i.item as CartAvailableBookableItem
        )
        if (lastSelectedItem) cartAvailableBookableItems.push(lastSelectedItem)
        const localAvailableBookableItemStores =
            availableBookableItemStores.concat()
        for (let availableBookableItem of cartAvailableBookableItems) {
            const filteredAvailableBookableItemStores =
                localAvailableBookableItemStores.filter(
                    (x) => x.availableBookableItemId == availableBookableItem.id
                )
            let itemLocationVariants =
                filteredAvailableBookableItemStores.flatMap(
                    (x) => x.cartAvailableBookableItemLocationVariant
                )
            if (itemLocationVariants.length == 0) {
                itemLocationVariants =
                    await availableBookableItem.getLocationVariants()
                localAvailableBookableItemStores.push({
                    availableBookableItemId: availableBookableItem.id,
                    cartAvailableBookableItemLocationVariant:
                        itemLocationVariants,
                } as AvailableBookableItemStores)
            }
            if (locations === undefined) {
                locations = itemLocationVariants
            } else {
                locations = locations.filter((l) =>
                    itemLocationVariants.some(
                        (v) => v.location.id === l.location.id
                    )
                )
            }
        }
        setAvailableBookableItemStores(localAvailableBookableItemStores)
        if (locations) {
            setLocations(locations.map((l) => l.location))
        } else {
            setLocations([])
        }
    }

    const setCartLocation = async (
        cart: Cart,
        selectedStore: Store,
        cartStore: Store | undefined,
        lastSelectedItem: CartAvailableBookableItem | undefined,
        selectedBookableItems: CartBookableItem[]
    ) => {
        if (!cart) {
            return selectedBookableItems
        }
        let newCart = cart

        // if new location distinguish from previous selected location, replace cart with new one
        if (!cartStore || cartStore.location.id !== selectedStore.location.id) {
            newCart = await createCart(selectedStore.location, selectedStore)

            for (let item of selectedBookableItems) {
                const cartBookableItem = item as CartBookableItem
                const cartAvailableBookableItem =
                    cartBookableItem.item as CartAvailableBookableItem
                if (cartAvailableBookableItem) {
                    newCart = await newCart.addBookableItem(
                        cartAvailableBookableItem
                    )
                }
            }
        }

        if (!cartStore) {
            newCart = await newCart.setLocation(selectedStore.location)
        }

        let selectedCartAvailableItems = selectedCartAvailableItemsStateValue
        if (lastSelectedItem) {
            newCart = await newCart.addBookableItem(lastSelectedItem)
            selectedCartAvailableItems =
                selectedCartAvailableItems.concat(lastSelectedItem)
            setSelectedCartAvailableItemsState(selectedCartAvailableItems)
        }
        return await loadSelectedServicesFromCart(
            newCart,
            selectedCartAvailableItems
        )
    }

    return {
        createCart: createCart,
        setCartCommonState: setCartCommonState,
        getCartDataLoadedState: getCartDataLoadedState,
        reserveBookableTime: reserveBookableTime,
        getPersonalInformation: getPersonalInformation,
        loadBookingAnswers: loadBookingAnswers,
        resetCategories: resetCategories,
        addService: addService,
        removeService: removeService,
        addAddon: addAddon,
        removeAddon: removeAddon,
        selectStaff: selectStaff,
        loadSelectedServices: loadSelectedServices,
        forceLoadSelectedServices: forceLoadSelectedServices,
        loadSelectedStaff: loadSelectedStaff,
        loadStoresForCartBookableItems: loadStoresForCartBookableItems,
        setCartLocation: setCartLocation,
        isCartAvailableBookableItem: isCartAvailableBookableItem,
        isCartAvailablePurchasableItem: isCartAvailablePurchasableItem,
    }
}

export const useCartDataLoadedState = () => useRecoilValue(cartDataLoaded)
export const useSetCartDataLoadedState = () => useSetRecoilState(cartDataLoaded)
