import { useState } from 'react'
import MapboxClient from '@mapbox/mapbox-sdk'
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import { WebMercatorViewport } from 'viewport-mercator-project'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import {
    defaultZoom,
    mapBoxFlyToInterpolator,
    mapBoxTransitionDuration,
} from 'lib/utils/locationUtils'
import { useMapView } from 'lib/state/location'
import { useActions } from 'components/molecules/DefineLocation/useActions'

export const useMapboxActions = (onSelected) => {
    const { getMapViewportState } = useMapView()
    const { mapboxApiAccessToken } = useConfig()
    const [geocodingClient] = useState(
        new MapboxGeocoding(
            new MapboxClient({ accessToken: mapboxApiAccessToken })
        )
    )
    const queryParams = {
        countries: ['us', 'ca'],
        types: ['region', 'postcode', 'district', 'place'],
    }
    const [debounceTimeout, setDebounceTimeout] = useState()
    const timeoutDefault = 300
    const defaultLimit = 5

    const getPlaceName = (place) => {
        return place.place_name
    }

    const displaySuggest = (item) => {
        const viewport = getMapViewportState()
        const webMercatorViewport = new WebMercatorViewport(viewport as any)
        let newViewPort
        const { bbox, center } = item

        if (bbox) {
            newViewPort = webMercatorViewport.fitBounds([
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]],
            ])
        } else {
            newViewPort = {
                longitude: center[0],
                latitude: center[1],
                zoom: defaultZoom,
            }
        }

        const { longitude, latitude, zoom } = newViewPort
        onSelected(
            {
                ...viewport,
                ...{
                    longitude,
                    latitude,
                    zoom,
                    transitionDuration: mapBoxTransitionDuration,
                    transitionInterpolator: mapBoxFlyToInterpolator,
                },
            },
            item
        )
    }

    const getResults = () => {
        return state.results
    }

    const getHasResults = () => {
        return state.results !== undefined && state.results.length > 0
    }

    const {
        onItemClick,
        onFocus,
        hideResults,
        state,
        onSearchClick,
        getValue,
        textInputRef,
        clear,
        setState,
        onKeyDown,
        onChangeViewClick,
    } = useActions({ displaySuggest, getPlaceName, getResults, getHasResults })

    const onChange = (event) => {
        const queryString = event.target.value
        setState((prevState) => ({
            ...prevState,
            inputValue: queryString,
            cachedVal: queryString,
        }))

        clearTimeout(debounceTimeout)
        const timeout = setTimeout(() => {
            const params = {
                ...queryParams,
                ...{ limit: defaultLimit },
                ...{ query: queryString },
            }
            if (params.limit > 0 && queryString.length > 0) {
                geocodingClient
                    .forwardGeocode(params)
                    .send()
                    .then((res) => {
                        setState((prevState) => ({
                            ...prevState,
                            results: [...res.body.features],
                        }))
                    })
            } else {
                setState((prevState) => ({ ...prevState, results: [] }))
            }
        }, timeoutDefault)
        setDebounceTimeout(timeout as any)
    }

    return {
        onChange: onChange,
        onItemClick: onItemClick,
        onFocus: onFocus,
        hideResults: hideResults,
        state: state,
        onKeyDown: onKeyDown,
        onSearchClick: onSearchClick,
        getValue: getValue,
        textInputRef: textInputRef,
        clear: clear,
        results: state.results,
        showResults: state.showResults,
        currIndex: state.currIndex,
        getPlaceName: getPlaceName,
        onChangeViewClick: onChangeViewClick,
    }
}
