import React from 'react'
import { Typography, Theme, Box, Collapse } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { FiX } from 'react-icons/fi'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { useCartState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import formatDateFns, { cartTimeToDate } from 'lib/utils/formatDateFns'
import { useIsSummaryBlockOpenState } from 'lib/state/summary'
import { getLocationName } from 'lib/utils/locationUtils'
import { theme } from 'styles/theme'
import { useMobile } from 'lib/utils/useMobile'
import { Location } from 'components/atoms/layout/summary/Location'
import { Services } from 'components/atoms/layout/summary/Services'
import { Time } from 'components/atoms/layout/summary/Time'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mobileSummary: {
            position: 'sticky',
            width: '100%',
            top: '46px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            'z-index': '1001',
            backgroundColor: '#ffffff',
        },
        mobileTopBlock: {
            width: '100%',
            height: '52px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
        },
        collapsedSummaryBlock: {
            width: '100%',
            position: 'absolute',
            top: '51px',
            backgroundColor: '#ffffff',
        },
    })
)

export default function MobileSummary() {
    const { isMobile } = useMobile()
    const classes = useStyles()
    const { currentFlowStep } = useFlowStep()
    const cart = useCartState()
    const selectedStore = useCartStoreState()
    const [isSummaryBlockOpen, setIsSummaryBlockOpen] =
        useIsSummaryBlockOpenState()

    const openMobileSummary = async () => {
        setIsSummaryBlockOpen(true)
    }

    const closeMobileSummary = () => {
        setIsSummaryBlockOpen(false)
    }

    if (
        !isMobile ||
        currentFlowStep.step === Step.ChooseLocation ||
        currentFlowStep.step === Step.BookingSuccess ||
        currentFlowStep.step === Step.LoadingStep
    ) {
        return null
    }

    return (
        <Box className={classes.mobileSummary}>
            <Box
                className={classes.mobileTopBlock}
                sx={{
                    boxShadow: isSummaryBlockOpen
                        ? 'none'
                        : '0px 4px 8px rgba(51, 52, 60, 0.06)',
                }}
            >
                <Box>
                    <Typography
                        color={theme.palette.primary.main}
                        fontSize="13px"
                    >
                        Your appointment
                    </Typography>
                    <Typography variant="body1" component="span">
                        {' '}
                        At{' '}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="span"
                        fontWeight="bold"
                    >
                        {getLocationName(selectedStore)}
                    </Typography>
                    {cart?.startTime && (
                        <>
                            <Typography variant="body1" component="span">
                                {' '}
                                on{' '}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                fontWeight="bold"
                            >
                                {formatDateFns(
                                    cartTimeToDate(cart?.startTime),
                                    selectedStore?.location.tz,
                                    'MM/dd/yyyy'
                                )}
                            </Typography>
                        </>
                    )}
                </Box>
                {!isSummaryBlockOpen ? (
                    <Typography
                        variant="subtitle2"
                        fontWeight="500"
                        fontSize="16px"
                        sx={{ cursor: 'pointer' }}
                        onClick={openMobileSummary}
                    >
                        View
                    </Typography>
                ) : (
                    <FiX size={20} onClick={closeMobileSummary} />
                )}
            </Box>
            <Collapse
                in={isSummaryBlockOpen}
                timeout="auto"
                className={classes.collapsedSummaryBlock}
            >
                <Location />
                <Services />
                <Time />
            </Collapse>
        </Box>
    )
}
