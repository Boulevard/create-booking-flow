import { Box, Theme } from '@mui/material'
import { SelectAvailability } from 'components/molecules/Services/ChooseDate/ManyDays/SelectAvailability'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { stepScreen } from 'constants/styles'

const useStyles = makeStyles((theme: Theme) => ({
    rightPanelWrapper: {
        paddingTop: '11px',
        paddingLeft: '20px',
        paddingRight: '20px',
        height: '100%',
        overflowY: 'scroll',
        position: 'sticky',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    blurScreen: stepScreen(theme).blurScreen,
    loader: stepScreen(theme).loader,
}))

export const ShowTimeForManyDaysComponent = () => {
    const classes = useStyles()
    return (
        <Box className={classes.rightPanelWrapper}>
            <SelectAvailability />
        </Box>
    )
}
