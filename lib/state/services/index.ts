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
import { CartAvailableItem } from '@boulevard/blvd-book-sdk/lib/carts/items'

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

export const selectedCartAvailableItemsState = atom<CartAvailableItem[]>({
    key: 'selectedCartAvailableItemsState',
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
    const selectedCartAvailableItemsStateValue = useRecoilValue(selectedCartAvailableItemsState)
    const setSelectedCartAvailableItemsState = useSetRecoilState(selectedCartAvailableItemsState)

    const reverseSelectedServices = (selectedServies: CartBookableItem[]) => {
        return selectedServies.concat().reverse()
    }

    const loadSelectedServicesFromCart = async (
        cart: Cart,
        selectedCartAvailableItems : CartAvailableItem[]
    ): Promise<CartBookableItem[]> => {
        const selectedItems = await cart.getSelectedItems()
        const cartBookableItems = selectedItems.map((x) => {
            return x as CartBookableItem
        })

        // We shouldn’t rely on the ordering of the items
        // returned by getSelectedItems - that ordering is not guaranteed and can change at any point in the future.
        // Sort items based on selectedCartAvailableItems.

        const usedIndexes : number[] = []
        const sortedCartBookableItems : CartBookableItem[] = []
        for (let availableItem of selectedCartAvailableItems) {
            for (let i = 0; i < cartBookableItems.length; i++) {
                const selectedItem = cartBookableItems[i]
                if (selectedItem.item.id === availableItem.id && usedIndexes.find(x=>x === i) === undefined) {
                    sortedCartBookableItems.push(selectedItem)
                    usedIndexes.push(i)
                    break
                }
            }
        }

        // We don't want to miss any element returned by server even it's available item is not in the selectedCartAvailableItems for some reason.
        for (let cartBookableItem of cartBookableItems) {
            if (sortedCartBookableItems.find(x=>x.id === cartBookableItem.id) === undefined) {
                sortedCartBookableItems.push(cartBookableItem)
            }
        }

        setSelectedServicesStateValue(sortedCartBookableItems)
        if (sortedCartBookableItems.length === 0) {
            setSelectedCartAvailableItemsState([])
        } else if (selectedCartAvailableItemsStateValue.length === 0) {
            setSelectedCartAvailableItemsState(sortedCartBookableItems.map(x=>x.item))
        }
        return sortedCartBookableItems
    }

    return {
        selectedServicesStateValue: selectedServicesStateValue,
        loadSelectedServicesFromCart: loadSelectedServicesFromCart,
        reverseSelectedServices: reverseSelectedServices,
        selectedCartAvailableItemsStateValue: selectedCartAvailableItemsStateValue,
        setSelectedCartAvailableItemsState: setSelectedCartAvailableItemsState,
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
