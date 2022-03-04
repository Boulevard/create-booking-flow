import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { PositionCoordinates } from './types'
import { defaultLatitude, defaultLongitude } from 'lib/utils/locationUtils'

const defaultPosition: PositionCoordinates = {
    latitude: defaultLatitude,
    longitude: defaultLongitude,
}

const currentPositionState = atom<PositionCoordinates>({
    key: 'currentPositionState',
    default: defaultPosition,
})

const currentPositionNameState = atom<string>({
    key: 'currentPositionNameState',
    default: '',
})

const isLocationAccessAllowed = atom<boolean>({
    key: 'isLocationAccessAllowed',
    default: false,
})

const isLocationAccessAnsweredByUser = atom<boolean>({
    key: 'isLocationAccessAnsweredByUser',
    default: false,
})

export const useCurrentPosition = () => useRecoilValue(currentPositionState)

export const useSetCurrentPosition = () =>
    useSetRecoilState(currentPositionState)

export const useIsLocationAccessAllowed = () =>
    useRecoilValue(isLocationAccessAllowed)
export const useSetIsLocationAccessAllowed = () =>
    useSetRecoilState(isLocationAccessAllowed)

export const useCurrentPositionName = () =>
    useRecoilValue(currentPositionNameState)
export const useSetCurrentPositionName = () =>
    useSetRecoilState(currentPositionNameState)

export const useIsLocationAccessAnsweredByUser = () =>
    useRecoilValue(isLocationAccessAnsweredByUser)
export const useSetIsLocationAccessAnsweredByUser = () =>
    useSetRecoilState(isLocationAccessAnsweredByUser)
