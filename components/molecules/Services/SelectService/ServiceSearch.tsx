import React from 'react'
import { useMobile } from 'lib/utils/useMobile'
import { Box, InputBase, Paper } from '@mui/material'
import { StyledButton } from 'components/molecules/DefineLocation/theme'
import { Search } from 'components/icons/Search'
import { useServiceSearchStyles } from 'components/molecules/Services/SelectService/useStyles'
import { SearchClear } from 'components/icons/SearchClear'
import { colors } from 'constants/colors'

export const ServiceSearch = ({ onChange, searchString, clear, isAnyServiceExist }) => {
    const { isMobile } = useMobile()
    const classes = useServiceSearchStyles({ isMobile })
    return (
        <Box>
            <Paper component="form" className={classes.paper}>
                <Box className={classes.inputWrapper}>
                    <InputBase
                        onChange={onChange}
                        className={classes.inputSearch}
                        placeholder={isAnyServiceExist ? 'Search for a service' : 'Search for a item'}
                        value={searchString}
                    />
                    {searchString &&
                        <Box
                        sx={{
                            position: 'relative',
                            right: '10px',
                            margin: 'auto',
                        }}
                    >
                        <Box
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: colors.text.grey,
                                fontSize: '14px',
                            }}
                            onClick={clear}
                        >
                            {isMobile ? <SearchClear /> : 'Clear'}
                        </Box>
                    </Box>
                   }
                </Box>
                <StyledButton>
                    <Search />
                </StyledButton>
            </Paper>
        </Box>
    )
}
