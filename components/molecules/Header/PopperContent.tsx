import { Box } from '@mui/material'
import { PaymentSummaryControl } from 'components/molecules/PaymentSummaryControl'
import { useStyles } from 'components/molecules/Header/useStyles'
import { useFlowStep } from 'lib/state/booking-flow'
import { useSetActiveSelectedService } from 'lib/state/services'
import { Step } from 'lib/state/booking-flow/types'
import { PopperTopRow } from 'components/molecules/Header/PopperTopRow'
import { PopperLocation } from 'components/molecules/Header/PopperLocation'
import { PopperDateTime } from 'components/molecules/Header/PopperDateTime'
import { PopperPersonalInfo } from 'components/molecules/Header/PopperPersonalInfo'

interface Props {
    handleClose: () => void
}

export const PopperContent = ({handleClose}: Props) => {
    const classes = useStyles()
    const { setStep } = useFlowStep()
    const setActiveSelectedService = useSetActiveSelectedService()

    const onServiceNameClick = async (bookableItem) => {
        setActiveSelectedService(bookableItem)
        handleClose()
        await setStep(Step.SelectedServices)
    }

    return (
        <>
            <Box className={classes.popperArrow}/>
            <Box className={classes.popperContent}>
                <PopperTopRow handleClose={handleClose}/>
                <PopperLocation handleClose={handleClose}/>
                <PopperDateTime handleClose={handleClose}/>
                <PopperPersonalInfo handleClose={handleClose}/>
                <Box className={classes.dashLine}/>
                <PaymentSummaryControl isTopSummaryMode={true} onServiceNameClick={onServiceNameClick}/>
            </Box>
        </>
    )
}
