import {
    AppBar,
    Grid,
} from '@mui/material'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { useMobile } from 'lib/utils/useMobile'
import { useStyles } from 'components/molecules/Header/useStyles'
import { CartItem } from 'components/molecules/Header/CartItem'
import { Logo } from 'components/molecules/Header/Logo'
import { Steps } from 'components/molecules/Header/Steps'
import { Progress } from 'components/molecules/Header/Progress'
import { AppSettings } from 'components/molecules/Header/AppSettings'

export const Header = () => {
    const { isMobile } = useMobile()
    const { currentFlowStep } = useFlowStep()
    const classes = useStyles()

    if (currentFlowStep.step === Step.LoadingStep) {
        return <></>
    }

    return (
        <AppBar position="fixed" elevation={0} sx={{ height: isMobile ? '46px': undefined }}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.topBlock}
            >
                <Logo/>
                {!isMobile && <Steps/>}
                <AppSettings/>
                <CartItem/>
            </Grid>
            <Progress/>
        </AppBar>
    )
}
