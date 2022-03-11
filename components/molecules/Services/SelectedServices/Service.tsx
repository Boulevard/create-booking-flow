import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Button } from '@mui/material'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import {
    useActiveSelectedService,
    useServiceActions,
    useSetActiveSelectedService,
} from 'lib/state/services'
import { useServiceStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { WithService } from 'components/molecules/Services/SelectedServices/WithService'

interface Props {
    bookableItem: CartBookableItem
    handleServiceChange?: (bookableItem: CartBookableItem) => void
}

export const Service = ({ bookableItem, handleServiceChange }: Props) => {
    const activeSelectedService = useActiveSelectedService()
    const setActiveSelectedService = useSetActiveSelectedService()
    const classes = useServiceStyles()
    const { currentFlowStep } = useFlowStep()
    const { onRemoveClick, onEditAddonClick } = useServiceActions(bookableItem)

    const hasAddons =
        bookableItem.item.optionGroups?.flatMap((x) => x.options).length > 0

    const onRemoveInternal = async () => {
        const removeClickResult = await onRemoveClick()
        if (handleServiceChange && removeClickResult && removeClickResult.activeItem) {
            await handleServiceChange(removeClickResult.activeItem)
        }
    }
    const handleChange = async () => {
        if (activeSelectedService?.id === bookableItem.id) {
            return
        }
        setActiveSelectedService(bookableItem)
        if (handleServiceChange) {
            await handleServiceChange(bookableItem)
        }
    }

    const selected = activeSelectedService?.id === bookableItem.id

    return (
        <WithService
            bookableItem={bookableItem}
            selected={selected}
            handleChange={handleChange}
            isReadMode={true}
            addRightArrow={true}
        >
            {hasAddons && currentFlowStep.step !== Step.SelectOptions && (
                <Button
                    variant="contained"
                    className={classes.editAddOn}
                    onClick={onEditAddonClick}
                >
                    Edit add-ons
                </Button>
            )}
            <Button
                variant="contained"
                className={classes.removeBtn}
                onClick={onRemoveInternal}
            >
                Remove
            </Button>
        </WithService>
    )
}
