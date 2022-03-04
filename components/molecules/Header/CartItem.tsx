import { Box, Popover } from '@mui/material'
import { Cart } from 'components/icons/Cart'
import { useStyles } from 'components/molecules/Header/useStyles'
import { useSelectedServices } from 'lib/state/services'
import { useState } from 'react'
import { PopperContent } from 'components/molecules/Header/PopperContent'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'

export const CartItem = () => {
    const { currentFlowStep } = useFlowStep()
    const classes = useStyles()
    const { selectedServicesStateValue } = useSelectedServices()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    if (currentFlowStep.step === Step.BookingSuccess) {
        return <></>
    }

    return (
        <>
            <Box
                className={classes.cart}
                onClick={handleClick}
                aria-describedby={id}
            >
                <Cart/>
                <Box className={classes.round}>{selectedServicesStateValue.length}</Box>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: 'none',
                    }
                }}
            >
                <PopperContent handleClose={handleClose}/>
            </Popover>
        </>
    )
}
