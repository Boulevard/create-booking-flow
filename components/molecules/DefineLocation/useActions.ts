import { useRef, useState } from 'react'
import { useCurrentPositionName } from 'lib/state/currentPosition'
import { isMobile as isMobileNative } from 'react-device-detect'
import { useIsShowMap } from 'lib/state/location'

export interface stateInterface {
    results: Array<any>
    showResults: boolean
    inputValue: string
    currIndex: number | null
    cachedVal: string
}

export const initialState = {
    results: [],
    showResults: false,
    inputValue: '',
    currIndex: null,
    cachedVal: '',
} as stateInterface

interface Props {
    displaySuggest: (item) => void
    getPlaceName: (place) => string
    getResults: () => any[]
    getHasResults: () => boolean
}

export const useActions = ({
    displaySuggest,
    getPlaceName,
    getResults,
    getHasResults,
}: Props) => {
    const textInputRef = useRef(null)
    const defaultLocationName = useCurrentPositionName()
    const [isShowMap, setIsShowMap] = useIsShowMap()
    const acceptedKeys = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter']
    const [state, setState] = useState(initialState)
    const [touched, setTouched] = useState(false)

    const clear = () => {
        setTouched(true)
        setState((prevState) => ({
            ...prevState,
            inputValue: '',
            cachedVal: '',
        }))
        const input = textInputRef?.current as unknown as HTMLInputElement
        if (input) {
            input.focus()
        }
    }

    const selectItem = (item) => {
        displaySuggest(item)
        setState((prevState) => ({
            ...prevState,
            inputValue: getPlaceName(item),
            cachedVal: getPlaceName(item),
        }))
        hideResults()
    }

    const onItemClick = (item, index) => {
        setState((prevState) => ({
            ...prevState,
            currIndex: index,
        }))
        return selectItem(item)
    }

    const onFocus = (e) => {
        e.preventDefault()
        if (!isMobileNative) {
            return
        }
        const input = e.target
        setTimeout(() => {
            input.setSelectionRange(input.value.length, input.value.length)
        }, 1)
    }

    const hideResults = () => {
        setTimeout(() => {
            const input = textInputRef?.current as unknown as HTMLInputElement
            if (input) {
                input.blur()
            }
            setState((prevState) => ({ ...prevState, showResults: false }))
        }, 300)
    }

    const onSearchClick = () => {
        const index = state.currIndex ?? 0
        const results = getResults()
        if (results === undefined || results.length - 1 < index) {
            return
        }
        selectItem(results[index])
    }

    const getValue = () => {
        return touched ? state.inputValue : defaultLocationName
    }

    const onKeyDown = (e) => {
        const event = e.nativeEvent
        setTouched(true)
        if (event.key === 'Escape') {
            hideResults()
            return
        }

        if (!state.showResults) {
            setState((prevState) => ({ ...prevState, showResults: true }))
        }

        if (!getHasResults() || !acceptedKeys.includes(event.key)) return

        const results = getResults()
        if (event.key === 'Enter') {
            event.preventDefault()
            if (state.currIndex !== null && results[state.currIndex]) {
                selectItem(results[state.currIndex])
            } else if (results.length > 0 && results[0]) {
                selectItem(results[0])
            }
            hideResults()
            return
        }

        let nextIndex: number | null

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            nextIndex = state.currIndex ?? results.length
            nextIndex = nextIndex > 0 ? nextIndex - 1 : null
        } else {
            nextIndex = state.currIndex ?? -1
            nextIndex = nextIndex < results.length - 1 ? nextIndex + 1 : null
        }

        setState((prevState) => ({
            ...prevState,
            currIndex: nextIndex,
            inputValue:
                nextIndex !== null && results[nextIndex]
                    ? getPlaceName(results[nextIndex])
                    : state.cachedVal,
        }))
    }

    const onChangeViewClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        setIsShowMap(!isShowMap)
    }

    return {
        onItemClick: onItemClick,
        onFocus: onFocus,
        hideResults: hideResults,
        state: state,
        onSearchClick: onSearchClick,
        getValue: getValue,
        textInputRef: textInputRef,
        clear: clear,
        showResults: state.showResults,
        currIndex: state.currIndex,
        setState: setState,
        setTouched: setTouched,
        selectItem: selectItem,
        onKeyDown: onKeyDown,
        onChangeViewClick: onChangeViewClick,
    }
}
