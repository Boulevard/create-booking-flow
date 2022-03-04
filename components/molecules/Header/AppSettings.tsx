import { Box, Popover } from '@mui/material'
import { useStyles } from 'components/molecules/Header/useStyles'
import { useState } from 'react'
import { useConfig } from 'lib/sdk/hooks/useConfig'
import { DisplayAppSettingsPopup } from 'lib/state/config'
import { AppSettingsPopper } from 'components/molecules/Header/AppSettingsPopper'

export const AppSettings = () => {
    const { displayAppSettings } = useConfig()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    if (displayAppSettings === DisplayAppSettingsPopup.No) {
        return <></>
    }

    return (
        <>
            <Box
                className={classes.settings}
                onClick={handleClick}
                aria-describedby={id}
            >
                Settings
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
                <AppSettingsPopper/>
            </Popover>
        </>
    )
}
