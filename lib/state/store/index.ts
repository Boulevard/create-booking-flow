import {
    atom,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import { AvailableBookableItemStores, Store } from 'lib/state/store/types'

export const cartStoreState = atom<Store | undefined>({
    key: 'cartStoreState',
    default: undefined,
})

export const storesState = atom<Store[]>({
    key: 'storesState',
    default: [],
})

export const availableBookableItemStoresState = atom<
    AvailableBookableItemStores[]
>({
    key: 'availableBookableItemStoresState',
    default: [],
})

export const useCartStoreState = () => useRecoilValue(cartStoreState)
export const useSetCartStoreState = () => useSetRecoilState(cartStoreState)
export const useResetCartStoreState = () => useResetRecoilState(cartStoreState)

export const useStoresState = () => useRecoilValue(storesState)
export const useSetStoresState = () => useSetRecoilState(storesState)

export const useAvailableBookableItemStoresState = () =>
    useRecoilValue(availableBookableItemStoresState)
export const useSetAvailableBookableItemStoresState = () =>
    useSetRecoilState(availableBookableItemStoresState)
