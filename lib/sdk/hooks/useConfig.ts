import { DateTimeType, DisplayAppSettingsPopup, FlowType, MapType } from 'lib/state/config'

export const useConfig = () => {
    const mapboxApiAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    const googleMapsApiAccessToken =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
    const mapType =
        process.env.NEXT_PUBLIC_MAP_TYPE === 'Google' ? MapType.Google : (process.env.NEXT_PUBLIC_MAP_TYPE === 'None' ? MapType.None : MapType.MapBox)
    const flowType =
        process.env.NEXT_PUBLIC_FLOW_TYPE === 'SelectServiceFirst' ?
            FlowType.SelectServiceFirst : FlowType.SelectLocationFirst
    const dateTimeType =
        process.env.NEXT_PUBLIC_DATE_TIME_TYPE === 'ShowTimeForManyDays' ?
            DateTimeType.ShowTimeForManyDays : DateTimeType.ShowTimeForOneDay
    const displayAppSettings =
        process.env.NEXT_PUBLIC_DISPLAY_APP_SETTINGS === 'Yes' ?
            DisplayAppSettingsPopup.Yes : DisplayAppSettingsPopup.No
    return {
        mapboxApiAccessToken: mapboxApiAccessToken,
        googleMapsApiAccessToken: googleMapsApiAccessToken,
        mapType: mapType,
        flowType: flowType,
        dateTimeType: dateTimeType,
        displayAppSettings: displayAppSettings,
    }
}
