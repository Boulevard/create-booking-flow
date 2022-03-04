import {
    atom,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import { ViewPortInterface } from 'lib/state/location/types'
import { Store } from 'lib/state/store/types'

export const locationSelectedStoreState = atom<Store | undefined>({
    key: 'locationSelectedStoreState',
    default: undefined,
})

export const mapViewportState = atom<ViewPortInterface>({
    key: 'mapViewportState',
    default: {
        latitude: 37.7577,
        longitude: -102.4376,
        zoom: 3,
    },
})

export const updateStoresViewportState = atom<any>({
    key: 'updateStoresViewportState',
    default: undefined,
})

export const defineLocationMapViewportState = atom<any>({
    key: 'defineLocationMapViewportState',
    default: {},
})

export const isShowMapState = atom<boolean>({
    key: 'isShowMapState',
    default: false,
})

export const useUpdateStoresViewportState = () =>
    useRecoilValue(updateStoresViewportState)
export const useSetUpdateStoresViewportState = () =>
    useSetRecoilState(updateStoresViewportState)

export const useLocationSelectedStoreState = () =>
    useRecoilState(locationSelectedStoreState)
export const useSetLocationSelectedStoreState = () =>
    useSetRecoilState(locationSelectedStoreState)
export const useResetLocationSelectedStoreState = () =>
    useResetRecoilState(locationSelectedStoreState)

export const useMapViewportState = () => useRecoilState(mapViewportState)
export const useSetMapViewportState = () => useSetRecoilState(mapViewportState)

export const useIsShowMap = () => useRecoilState(isShowMapState)
export const useSetIsShowMap = () => useSetRecoilState(isShowMapState)

export const useMapView = () => {
    const getMapViewportState = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                let loadable = snapshot.getLoadable(
                    defineLocationMapViewportState
                )
                return loadable.valueMaybe()
            },
        []
    )
    return {
        getMapViewportState: getMapViewportState,
    }
}

export const useSetDefineLocationMapViewportState = () =>
    useSetRecoilState(defineLocationMapViewportState)
