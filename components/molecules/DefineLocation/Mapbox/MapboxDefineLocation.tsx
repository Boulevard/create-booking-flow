import React from 'react'
import { useMapboxActions } from 'components/molecules/DefineLocation/Mapbox/useMapboxActions'
import { DefineLocation } from 'components/molecules/DefineLocation/DefineLocation'

export const MapboxDefineLocation = ({ onSelected }) => {
    const {
        clear,
        onChange,
        hideResults,
        onFocus,
        onItemClick,
        results,
        showResults,
        onKeyDown,
        onSearchClick,
        onChangeViewClick,
        getValue,
        textInputRef,
        currIndex,
        getPlaceName,
    } = useMapboxActions(onSelected)

    return (
        <DefineLocation
            clear={clear}
            currIndex={currIndex}
            getPlaceName={getPlaceName}
            getValue={getValue}
            hideResults={hideResults}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onChange={onChange}
            onItemClick={onItemClick}
            onSearchClick={onSearchClick}
            onChangeViewClick={onChangeViewClick}
            results={results}
            showResults={showResults}
            textInputRef={textInputRef}
        />
    )
}
