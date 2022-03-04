import { Box, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useMobile } from 'lib/utils/useMobile'
import { useWithLayoutStyles } from 'components/atoms/layout/useWithLayoutStyles'
import BounceLoader from 'react-spinners/BounceLoader'
import clsx from 'clsx'
import { LeftSummary } from 'components/atoms/layout/summary/LeftSummary'
import { Context, LayoutContext } from 'components/atoms/layout/LayoutContext'
import ServerError from 'components/molecules/ServerError'
import { ErrorType } from 'lib/state/error/enums'
import { useErrorMessageType } from 'lib/state/error'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { ArrowLeft } from 'components/icons/ArrowLeft'

interface Props {
    isShowLoader?: boolean
    leftPanel?: React.ReactNode
    rightPanel?: React.ReactNode
    showBottom?: boolean
    isBlurScreen?: boolean
    rightPanelCaption?: string
    rightPanelBtnCaption?: string
    onRightPanelBtnClick?: () => void
    showLeftBottom?: boolean
    leftPanelBtnCaption?: string
    onLeftPanelBtnClick?: () => void
    isHideLeftPanel?: boolean
    isHideRightPanel?: boolean
    workshopPanel?: React.ReactNode
    addBackArrow?: boolean
    backArrowStep?: Step
}

export default function WithLayout({
    isShowLoader,
    leftPanel,
    rightPanel,
    showBottom,
    isBlurScreen,
    rightPanelCaption,
    rightPanelBtnCaption,
    onRightPanelBtnClick,
    showLeftBottom,
    leftPanelBtnCaption,
    onLeftPanelBtnClick,
    isHideLeftPanel,
    isHideRightPanel,
    workshopPanel,
    addBackArrow,
    backArrowStep,
}: Props) {
    const { isMobile } = useMobile()
    const classes = useWithLayoutStyles({ isMobile })
    const { setStep } = useFlowStep()
    const [displayBottom, setDisplayBottom] = useState(showBottom ?? false)
    const [displayLeftBottom, setDisplayLeftBottom] = useState(
        showLeftBottom ?? false
    )
    const [showLoader, setShowLoader] = useState(isShowLoader ?? false)
    const [blurScreen, setBlurScreen] = useState(isBlurScreen ?? false)
    const [hideLeftPanel, setHideLeftPanel] = useState(isHideLeftPanel ?? false)
    const [hideRightPanel, setHideRightPanel] = useState(
        isHideRightPanel ?? false
    )
    const [rightPanelBtnClick, setRightPanelBtnClick] = useState({
        onRightPanelBtnClick,
    })
    const [errorMessageType] = useErrorMessageType()
    const providerValue: Context = {
        isShowLoader: showLoader,
        showBottom: displayBottom,
        isBlurScreen: blurScreen,
        setShowBottom: (showBottom: boolean) => {
            setDisplayBottom(showBottom)
        },
        setIsShowLoader: (isShowLoader: boolean) => {
            setShowLoader(isShowLoader)
        },
        setIsBlurScreen: (isBlurScreen: boolean) => {
            setBlurScreen(isBlurScreen)
        },
        setOnRightPanelBtnClick: (onRightPanelBtnClick: () => void) => {
            setRightPanelBtnClick({ onRightPanelBtnClick })
        },
        setHideLeftPanel: (hideLeftPanel: boolean) => {
            setHideLeftPanel(hideLeftPanel)
        },
        setHideRightPanel: (hideRightPanel: boolean) => {
            setHideRightPanel(hideRightPanel)
        },
        setShowLeftBottom: (showLeftBottom: boolean) => {
            setDisplayLeftBottom(showLeftBottom)
        },
    }

    const onStepClick = async () => {
        if (backArrowStep) {
            await setStep(backArrowStep)
        }
    }

    return (
        <LayoutContext.Provider value={providerValue}>
            <Box className={classes.root}>
                <Grid
                    container
                    className={clsx(
                        classes.grid,
                        (errorMessageType !== ErrorType.NoError ||
                            showLoader ||
                            blurScreen) &&
                            classes.blurScreen
                    )}
                >
                    {!hideLeftPanel && (
                        <Grid item className={classes.left}>
                            {!isMobile && <LeftSummary />}
                            {leftPanel}
                            {displayLeftBottom && (
                                <Box className={classes.leftPanelBottom}>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        className={classes.leftPanelBottomBtn}
                                        onClick={onLeftPanelBtnClick}
                                        sx={{
                                            width: '403px',
                                        }}
                                    >
                                        {leftPanelBtnCaption}
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    )}
                    {!hideRightPanel && (
                        <Grid item className={classes.right}>
                            {rightPanelCaption && (
                                <Box className={classes.rightPanelCaption}>
                                    {addBackArrow && (
                                        <Box
                                            className={
                                                classes.rightPanelCaptionIcon
                                            }
                                            onClick={onStepClick}
                                        >
                                            <ArrowLeft color="#000000E5" />
                                        </Box>
                                    )}
                                    <Box
                                        className={
                                            classes.rightPanelCaptionText
                                        }
                                    >
                                        {rightPanelCaption}
                                    </Box>
                                </Box>
                            )}
                            {rightPanel}
                            {displayBottom && (
                                <Box className={classes.rightPanelBottom}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.rightPanelBottomBtn}
                                        onClick={
                                            rightPanelBtnClick.onRightPanelBtnClick
                                        }
                                    >
                                        {rightPanelBtnCaption}
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    )}
                </Grid>
                {showLoader && (
                    <Box position="fixed" className={classes.loader}>
                        <BounceLoader color="#dadada" size={60} />
                    </Box>
                )}
                {errorMessageType !== ErrorType.NoError && <ServerError />}
            </Box>
            {workshopPanel}
        </LayoutContext.Provider>
    )
}
