import {
    useActiveSelectedService,
    useSelectedCartAvailableCategory,
} from 'lib/state/services'
import { Box, Typography } from '@mui/material'
import { useOptionsListStyles } from 'components/molecules/Services/SelectOptions/useStyles'
import { Option } from 'components/molecules/Services/SelectOptions/Option'
import React from 'react'

export const OptionsList = () => {
    const classes = useOptionsListStyles()
    const activeSelectedService = useActiveSelectedService()
    const optionGroups = activeSelectedService?.item?.optionGroups
    const options = optionGroups?.flatMap((x) => x.options)
    return (
        <Box className={classes.root}>
            {options?.map((option) => (
                <Option
                    key={option.id}
                    option={option}
                    bookableItem={activeSelectedService}
                />
            ))}
            {!options?.length && (
                <Box className={classes.noOptionsAvailableWrapper}>
                    <Typography>
                        No options available
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
