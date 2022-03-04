import { ChangeEvent } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    HookArgs,
} from 'use-places-autocomplete'
import { defaultZoom } from 'lib/utils/locationUtils'
import { useActions } from 'components/molecules/DefineLocation/useActions'

export const useGoogleActions = (onSelected) => {
    const getPlaceName = (place) => {
        return place.description
    }

    const displaySuggest = (suggestion) => {
        const address = suggestion.description

        getGeocode({ address })
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                const { lat, lng } = latLng
                onSelected({
                    longitude: lng,
                    latitude: lat,
                    zoom: defaultZoom,
                })
                setSearchValue(address)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    const {
        value,
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['(regions)'],
            componentRestrictions: { country: ['us', 'ca'] },
        },
    } as HookArgs)
    const hasSuggestions = status === 'OK'

    const getResults = () => {
        return data
    }

    const getHasResults = () => {
        return hasSuggestions
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
        currIndex,
        setState,
        onKeyDown,
        onChangeViewClick,
    } = useActions({ displaySuggest, getPlaceName, getResults, getHasResults })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const queryString = e.target.value
        if (queryString === '') {
            setSearchValue(queryString)
        } else {
            setValue(queryString)
        }
        setState((prevState) => ({
            ...prevState,
            inputValue: queryString,
            cachedVal: queryString,
        }))
    }

    const setSearchValue = (value: string, shouldFetchData?: boolean) => {
        setValue(value, shouldFetchData)
    }

    const onSuggestSelected = (suggestion) => () => {
        displaySuggest(suggestion)
    }

    return {
        value: value,
        textInputRef: textInputRef,
        onKeyDown: onKeyDown,
        onChange: onChange,
        status: status,
        results: data,
        onSuggestSelected: onSuggestSelected,
        currIndex: currIndex,
        state: state,
        hideResults: hideResults,
        onFocus: onFocus,
        getValue: getValue,
        clear: clear,
        onSearchClick: onSearchClick,
        onItemClick: onItemClick,
        showResults: state.showResults,
        getPlaceName: getPlaceName,
        onChangeViewClick: onChangeViewClick,
    }
}
