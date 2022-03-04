import {
    Cart,
    CartAvailableBookableItem,
    CartAvailableCategory,
    CartBookableItem,
} from '@boulevard/blvd-book-sdk/lib/cart'
import {
    atom,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { useFlowStep } from 'lib/state/booking-flow'
import { FlowType, useAppConfig } from 'lib/state/config'
import { Step } from 'lib/state/booking-flow/types'

export const availableCategoriesState = atom<CartAvailableCategory[]>({
    key: 'availableCategories',
    default: [],
})

export const selectedCartAvailableCategoryState = atom<
    CartAvailableCategory | undefined
>({
    key: 'selectedCartAvailableCategoryState',
    default: undefined,
})

export const selectedServicesState = atom<CartBookableItem[]>({
    key: 'selectedServicesState',
    default: [],
})

export const activeSelectedServiceState = atom<CartBookableItem | undefined>({
    key: 'activeSelectedServiceState',
    default: undefined,
})

export const lastSelectedBookableItem = atom<
    CartAvailableBookableItem | undefined
>({
    key: 'lastSelectedBookableItem',
    default: undefined,
})

export const useAvailableCategories = () =>
    useRecoilValue(availableCategoriesState)
export const useSetAvailableCategories = () =>
    useSetRecoilState(availableCategoriesState)

export const useSelectedCartAvailableCategory = () =>
    useRecoilValue(selectedCartAvailableCategoryState)
export const useSetSelectedCartAvailableCategory = () =>
    useSetRecoilState(selectedCartAvailableCategoryState)
export const useResetSelectedCartAvailableCategory = () =>
    useResetRecoilState(selectedCartAvailableCategoryState)

export const useActiveSelectedService = () =>
    useRecoilValue(activeSelectedServiceState)
export const useSetActiveSelectedService = () =>
    useSetRecoilState(activeSelectedServiceState)

export const useLastSelectedBookableItem = () =>
    useRecoilValue(lastSelectedBookableItem)
export const useSetLastSelectedBookableItem = () =>
    useSetRecoilState(lastSelectedBookableItem)
export const useResetLastSelectedBookableItem = () =>
    useResetRecoilState(lastSelectedBookableItem)

export const useSelectedServices = () => {
    const selectedServicesStateValue = useRecoilValue(selectedServicesState)
    const setSelectedServicesStateValue = useSetRecoilState(
        selectedServicesState
    )

    const reverseSelectedServices = (selectedServies: CartBookableItem[]) => {
        return selectedServies.concat().reverse()
    }

    const loadSelectedServicesFromCart = async (
        cart: Cart
    ): Promise<CartBookableItem[]> => {
        const selectedItems = await cart.getSelectedItems()
        const cartBookableItems = selectedItems.map((x) => {
            return x as CartBookableItem
        })
        setSelectedServicesStateValue(cartBookableItems)
        return cartBookableItems
    }

    return {
        selectedServicesStateValue: selectedServicesStateValue,
        setSelectedServicesStateValue: setSelectedServicesStateValue,
        loadSelectedServicesFromCart: loadSelectedServicesFromCart,
        reverseSelectedServices: reverseSelectedServices,
    }
}

export const useServiceActions = (
    bookableItem: CartBookableItem | undefined
) => {
    const cart = useCartState()
    const setActiveSelectedService = useSetActiveSelectedService()
    const { removeService, createCart } = useCartMethods()
    const { setStep } = useFlowStep()
    const { reverseSelectedServices } = useSelectedServices()
    const { getFlowType } = useAppConfig()
    const flowType = getFlowType()

    const removeAllItemsSelectLocationFirstNextStep = async () => {
        await setStep(Step.SelectService)
    }

    const removeAllItemsSelectServiceFirstNextStep = async () => {
        await createCart()
        await setStep(Step.SelectService)
    }

    const removeAllItemsNextStep = async () => {
        if (flowType === FlowType.SelectLocationFirst) {
            await removeAllItemsSelectLocationFirstNextStep()
        } else {
            await removeAllItemsSelectServiceFirstNextStep()
        }
    }

    const onRemoveClick = async () => {
        if (cart === undefined || bookableItem === undefined) {
            return
        }
        const cartServices = await removeService(cart, bookableItem)
        if (cartServices.services.length === 0) {
            await removeAllItemsNextStep()
        } else {
            const services = reverseSelectedServices(cartServices.services)
            const activeItem = services[0]
            setActiveSelectedService(activeItem)
            return { activeItem, selectedServices: cartServices.services}
        }
    }

    const onEditAddonClick = async () => {
        setActiveSelectedService(bookableItem)
        await setStep(Step.SelectOptions)
    }

    return {
        onRemoveClick: onRemoveClick,
        onEditAddonClick: onEditAddonClick,
    }
}
