import { atom, useRecoilValue } from 'recoil'
import {
    getPersistedState,
    makePersistedSetRecoilState,
} from 'lib/state/persistence'
import { useConfig } from 'lib/sdk/hooks/useConfig'

const MAP_TYPE = 'MAP_TYPE'
const DATETIME_TYPE = 'DATETIME_TYPE'
const FLOW_TYPE = 'FLOW_TYPE'

export const mapTypeState = atom<string | undefined>({
    key: 'mapTypeState',
    default: getPersistedState(MAP_TYPE) ?? undefined,
})

export const dateTimeTypeState = atom<string | undefined>({
    key: 'dateTimeTypeState',
    default: getPersistedState(DATETIME_TYPE) ?? undefined,
})

export const flowTypeState = atom<string | undefined>({
    key: 'flowTypeState',
    default: getPersistedState(FLOW_TYPE) ?? undefined,
})

export const useMapTypeState = () => useRecoilValue(mapTypeState)
export const useSetMapTypeState = makePersistedSetRecoilState(
    MAP_TYPE,
    mapTypeState
)

export const useDateTimeTypeState = () => useRecoilValue(dateTimeTypeState)
export const useSetDateTimeTypeState = makePersistedSetRecoilState(
    DATETIME_TYPE,
    dateTimeTypeState
)

export const useFlowTypeState = () => useRecoilValue(flowTypeState)
export const useSetFlowTypeState = makePersistedSetRecoilState(
    FLOW_TYPE,
    flowTypeState
)

export enum MapType {
    MapBox = 0,
    Google = 1,
    None = 2,
}

export enum DateTimeType {
    ShowTimeForOneDay,
    ShowTimeForManyDays,
}

export enum FlowType {
    SelectLocationFirst,
    SelectServiceFirst,
}

export enum DisplayAppSettingsPopup {
    No,
    Yes,
}

export const useAppConfig = () => {
    const {mapType, flowType, dateTimeType, mapboxApiAccessToken, googleMapsApiAccessToken} = useConfig()
    const mapTypeString = useMapTypeState()
    const dateTimeTypeString = useDateTimeTypeState()
    const flowTypeState = useFlowTypeState()

    function getValue<T extends number, TEnumValue extends string>(
        value: string | undefined,
        defaultValue: T,
        enumVariable: { [key in number]: TEnumValue }
    ) {
        let result: T | undefined
        if (value) {
            result = enumVariable[value] as T
        }
        return result ?? defaultValue
    }

    const getMapType = (): MapType => {
        return getValue(mapTypeString, mapType, MapType)
    }

    const isMapAvailable = (): boolean => {
        const mapType = getMapType()
        if (mapType === MapType.MapBox) {
            return !!mapboxApiAccessToken
        } else if (mapType === MapType.Google) {
            return !!googleMapsApiAccessToken
        }
        return false
    }

    const getDateTimeType = (): DateTimeType => {
        return getValue(
            dateTimeTypeString,
            dateTimeType,
            DateTimeType
        )
    }

    const getFlowType = (): FlowType => {
        return getValue(flowTypeState, flowType, FlowType)
    }

    return {
        getMapType: getMapType,
        getDateTimeType: getDateTimeType,
        getFlowType: getFlowType,
        isMapAvailable: isMapAvailable,
    }
}
