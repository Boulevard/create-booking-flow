import { Box, Button } from '@mui/material'
import { useStyles } from 'components/molecules/Header/useStyles'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ChangeEvent, useState } from 'react'
import {
    DateTimeType,
    FlowType,
    MapType, useAppConfig, useSetDateTimeTypeState,
    useSetFlowTypeState,
    useSetMapTypeState
} from 'lib/state/config'
import { useSetCartIdState } from 'lib/state/cart'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import FormLabel from '@mui/material/FormLabel'

export const AppSettingsPopper = () => {
    const { setStep } = useFlowStep()
    const setCartIdState = useSetCartIdState()
    const classes = useStyles()

    const {getDateTimeType, getMapType, getFlowType} = useAppConfig()

    const flowTypeState = getFlowType()
    const setFlowTypeState = useSetFlowTypeState()

    const mapTypeState = getMapType()
    const setMapTypeState = useSetMapTypeState()

    const dateTimeState = getDateTimeType()
    const setDateTimeTypeState = useSetDateTimeTypeState()

    const [uiFlowType, setUiFlowType] = useState(FlowType[flowTypeState])
    const [uiMapType, setUiMapType] = useState(MapType[mapTypeState])
    const [uiDateTimeType, setUiDateTimeType] = useState(DateTimeType[dateTimeState])

    const handleUiFlowTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUiFlowType((event.target as HTMLInputElement).value)
    }

    const handleUiMapTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUiMapType((event.target as HTMLInputElement).value)
    }

    const handleUiDateTimeTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUiDateTimeType((event.target as HTMLInputElement).value)
    }

    const onOk = async () => {
        setFlowTypeState(uiFlowType)
        setMapTypeState(uiMapType)
        setDateTimeTypeState(uiDateTimeType)
        setCartIdState(undefined)
        await setStep(Step.LoadingStep)
        location.reload()
    }

    return (
        <Box className={classes.popperContent}>
            <Box
                className={classes.boxWrapperCommon}
                sx={{
                    pb: 3,
                }}
            >
                Cart will be cleared on saving settings.
                <br/>
                <br/>
                Settings changes will be applied only to current browser.
            </Box>
            <Box
                className={classes.boxWrapperCommon}
                sx={{
                    pb: 3,
                }}
            >
                <FormLabel>Flow</FormLabel>
                <RadioGroup
                    value={uiFlowType}
                    onChange={handleUiFlowTypeChange}
                    className={classes.radioGroup}
                >
                    <FormControlLabel value={FlowType[FlowType.SelectLocationFirst]} control={<Radio />} label="Location first" />
                    <FormControlLabel value={FlowType[FlowType.SelectServiceFirst]} control={<Radio />} label="Service First" />
                </RadioGroup>
            </Box>

            <Box
                className={classes.boxWrapperCommon}
                sx={{
                    pb: 3,
                }}
            >
                <FormLabel>Map</FormLabel>
                <RadioGroup
                    value={uiMapType}
                    onChange={handleUiMapTypeChange}
                    className={classes.radioGroup}
                >
                    <FormControlLabel value={MapType[MapType.MapBox]} control={<Radio />} label="MapBox" />
                    <FormControlLabel value={MapType[MapType.Google]} control={<Radio />} label="Google" />
                    <FormControlLabel value={MapType[MapType.None]} control={<Radio />} label="None" />
                </RadioGroup>
            </Box>

            <Box
                className={classes.boxWrapperCommon}
                sx={{
                    pb: 3,
                }}
            >
                <FormLabel>Date & Time Selection</FormLabel>
                <RadioGroup
                    value={uiDateTimeType}
                    onChange={handleUiDateTimeTypeChange}
                    className={classes.radioGroup}
                >
                    <FormControlLabel value={DateTimeType[DateTimeType.ShowTimeForOneDay]} control={<Radio />} label="Single Day at a Time (Calendar UI)" />
                    <FormControlLabel value={DateTimeType[DateTimeType.ShowTimeForManyDays]} control={<Radio />} label="List of Days & Times" />
                </RadioGroup>
            </Box>
            <Button
                variant="contained"
                sx={{
                    width: '100%'
                }}
                onClick={onOk}
            >
                OK
            </Button>
        </Box>
    )
}
