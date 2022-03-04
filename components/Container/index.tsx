import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useIsSummaryBlockOpenState } from 'lib/state/summary'
import { memo } from 'react'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { useMobile } from 'lib/utils/useMobile'

const useStyles = makeStyles(() => ({
    blur: {
        '-webkit-filter': 'blur(12px)',
        '-moz-filter': 'blur(12px)',
        ' -o-filter': 'blur(12px)',
        '-ms-filter': 'blur(12px)',
        filter: 'blur(12px)',
        opacity: '0.5',
        pointerEvents: 'none',
        position: 'fixed',
        width: '100%',
    },
}))

export const Container = ({ children }) => {
    const classes = useStyles()
    const { currentFlowStep } = useFlowStep()

    // eslint-disable-next-line react/display-name
    const Children = memo(() => {
        return <>{children}</>
    })

    const Layout = () => {
        const { isMobile } = useMobile()
        const isDesktopMode =
            !isMobile || currentFlowStep.step === Step.LoadingStep
        const [isSummaryBlockOpen, setIsSummaryBlockOpen] =
            useIsSummaryBlockOpenState()
        const onClick = () => {
            if (!isDesktopMode && isSummaryBlockOpen) {
                setIsSummaryBlockOpen(false)
            }
        }
        return (
            <Box
                onClick={onClick}
                sx={{
                    height: isDesktopMode ? '100%' : 'auto',
                    paddingTop: isDesktopMode ? '70px' : '0',
                }}
            >
                <Box
                    className={
                        !isDesktopMode && isSummaryBlockOpen ? classes.blur : ''
                    }
                    sx={{
                        height: isDesktopMode ? '100%' : 'auto',
                        width: '100%',
                    }}
                >
                    <Children />
                </Box>
            </Box>
        )
    }

    return (
        <>
            <Layout />
        </>
    )
}
