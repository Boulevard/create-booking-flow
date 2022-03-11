import { useMobile } from 'lib/utils/useMobile'
import { Box, Button } from '@mui/material'
import { useMobileAddAnotherServiceStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { useContext } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { useActiveSelectedService, useServiceActions } from 'lib/state/services'
import { useSelectedServiceChange } from 'components/molecules/Services/SelectedServices/useSelectedServiceChange'

interface Props {
    allowAddAnotherService?: boolean
    allowRemoveService?: boolean
    allowEditAddonService?: boolean
}

export const MobileAddAnotherService = ({
    allowAddAnotherService,
    allowRemoveService,
    allowEditAddonService,
}: Props) => {
    const { setStep } = useFlowStep()
    const { isMobile } = useMobile()
    const classes = useMobileAddAnotherServiceStyles({ isMobile })
    const layout = useContext(LayoutContext)
    const activeSelectedService = useActiveSelectedService()
    const {handleServiceChange} = useSelectedServiceChange()
    const hasAddons =
        activeSelectedService &&
        activeSelectedService.item.optionGroups?.flatMap((x) => x.options)
            .length > 0

    const { onRemoveClick, onEditAddonClick } = useServiceActions(
        activeSelectedService
    )

    const onRemoveInternal = async () => {
        const removeClickResult = await onRemoveClick()
        if (handleServiceChange && removeClickResult) {
            await handleServiceChange(removeClickResult.activeItem)
        }
    }

    const onAddAnotherServiceClick = async () => {
        await setStep(Step.SelectService)
    }

    if (!isMobile) {
        return <></>
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: '160px',
                }}
            />
            <Box className={classes.leftPanelBottom} sx={{
                bottom: layout.showBottom ? '56px' : '0px!important',
            }}>
                {layout.showBottom && allowAddAnotherService && (
                    <Button
                        variant="text"
                        color="secondary"
                        className={classes.leftPanelBottomBtn}
                        onClick={onAddAnotherServiceClick}
                        sx={{
                            width: 'auto',
                        }}
                    >
                        Add another
                    </Button>
                )}
                {allowRemoveService && (
                    <Button
                        variant="text"
                        color="secondary"
                        className={classes.leftPanelBottomBtn}
                        onClick={onRemoveInternal}
                        sx={{
                            width: 'auto',
                        }}
                    >
                        Remove
                    </Button>
                )}
                {hasAddons && allowEditAddonService && (
                    <Button
                        variant="text"
                        color="secondary"
                        className={classes.leftPanelBottomBtn}
                        onClick={onEditAddonClick}
                        sx={{
                            width: 'auto',
                            textTransform: 'none',
                        }}
                    >
                        Edit add-ons
                    </Button>
                )}
            </Box>
        </>
    )
}
