import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelectServiceScreenStyles } from 'components/molecules/Services/SelectService/useStyles'
import { theme } from 'styles/theme'
import { CategoriesList } from 'components/molecules/Services/SelectService/CategoriesList'
import { ServiceSearch } from 'components/molecules/Services/SelectService/ServiceSearch'
import { CartAvailableCategory } from '@boulevard/blvd-book-sdk/lib/cart'
import { useAvailableCategories } from 'lib/state/services'
import { useCartMethods } from 'lib/state/cart'
import Font from 'config/fonts.json'

interface Props {
    onSearchChange: (event) => void
    availableCategories: CartAvailableCategory[]
    searchString: string,
    clear: () => void
}

export const LeftPanel = ({
    onSearchChange,
    availableCategories,
    searchString,
    clear,
}: Props) => {
    const classes = useSelectServiceScreenStyles()
    const {isCartAvailableBookableItem} = useCartMethods()
    const initialAvailableCategories = useAvailableCategories()
    const isAnyServiceExist = initialAvailableCategories.flatMap(x=>x.availableItems).filter(x=>isCartAvailableBookableItem(x)).length > 0

    return (
        <Box className={classes.listWrapper}>
            <Box
                sx={{
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
                }}
            >
                <Typography
                    variant="h6"
                    component="span"
                    fontFamily={Font.headings_family}
                >
                    {isAnyServiceExist ? 'Select a service option' : 'Select an item'}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <ServiceSearch
                        onChange={onSearchChange}
                        searchString={searchString}
                        clear={clear}
                        isAnyServiceExist={isAnyServiceExist}
                    />
                </Box>
            </Box>
            <CategoriesList availableCategories={availableCategories} />
        </Box>
    )
}
