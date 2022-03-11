import React from 'react'
import clsx from 'clsx'
import { Box, InputBase, Paper } from '@mui/material'
import { useMobile } from 'lib/utils/useMobile'
import { useStyles } from 'components/molecules/DefineLocation/useStyles'
import { colors } from 'constants/colors'
import { useIsShowMap } from 'lib/state/location'
import { SearchClear } from 'components/icons/SearchClear'
import { StyledButton } from 'components/molecules/DefineLocation/theme'
import { Search } from 'components/icons/Search'
import { Map } from 'components/icons/Map'
import { List } from 'components/icons/List'

export const DefineLocation = ({
    clear,
    onChange,
    hideResults,
    onFocus,
    onItemClick,
    results,
    showResults,
    onKeyDown,
    onSearchClick,
    getValue,
    textInputRef,
    currIndex,
    getPlaceName,
    onChangeViewClick,
}) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    const [isShowMap] = useIsShowMap()
    const placeholder = !isMobile
        ? 'C\u2063ity or Z\u2063ip c\u2063ode'
        : 'Enter a c\u2063ity or z\u2063ip c\u2063ode'
    const isEmpty = getValue() === ''
    return (
        <Box>
            <Paper component="form" className={classes.paper}>
                <Box className={classes.inputWrapper}>
                    <InputBase
                        onChange={onChange}
                        onBlur={hideResults}
                        onKeyDown={onKeyDown}
                        onFocus={onFocus}
                        className={classes.inputSearch}
                        inputRef={textInputRef}
                        placeholder={placeholder}
                        value={getValue()}
                    />
                    <Box
                        sx={{
                            position: 'relative',
                            right: '10px',
                            margin: 'auto',
                        }}
                    >
                        {!isEmpty && <Box
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: colors.text.grey,
                                fontSize: '14px',
                            }}
                            onClick={clear}
                        >
                            {isMobile ? <SearchClear /> : 'Clear'}
                        </Box>}
                    </Box>
                </Box>
                <StyledButton onClick={onSearchClick}>
                    <Search />
                </StyledButton>
                {isMobile && (
                    <StyledButton onClick={onChangeViewClick}>
                        {!isShowMap ? <Map /> : <List />}
                    </StyledButton>
                )}
            </Paper>

            {showResults && !!results.length && (
                <Box className={classes.resultList}>
                    {results.map((item, index) => (
                        <Box
                            key={index}
                            className={clsx(
                                index === currIndex && classes.resultItemHover,
                                classes.resultItem
                            )}
                            onClick={() => onItemClick(item, index)}
                        >
                            {getPlaceName(item)}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}
