import { CartAvailableBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { useServiceStyles } from 'components/molecules/Services/SelectService/useStyles'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { useCartStoreState } from 'lib/state/store'
import { useSetLastSelectedBookableItem } from 'lib/state/services'
import { useContext } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { FlowType, useAppConfig } from 'lib/state/config'
import { ServiceAvailableBookableItem } from 'components/atoms/layout/service/ServiceAvailableBookableItem'
import { ServicePrice } from 'components/atoms/layout/service/ServicePrice'
import { SelectableListItem } from 'components/atoms/layout/selectable-list-item/SelectableListItem'

interface Props {
    bookableItem: CartAvailableBookableItem
}

export const Service = ({ bookableItem }: Props) => {
    const classes = useServiceStyles()
    const cart = useCartState()
    cart?.addBookableItem(bookableItem)
    console.log(cart)
    const { addService, loadSelectedServices, loadStoresForCartBookableItems, isCartAvailableBookableItem } =
        useCartMethods()
    const { setStep } = useFlowStep()
    const cartStore = useCartStoreState()
    const layout = useContext(LayoutContext)
    const { getFlowType } = useAppConfig()
    const flowType = getFlowType()
    const setLastSelectedBookableItem = useSetLastSelectedBookableItem()
    const hasOptions = bookableItem.optionGroups?.length > 0
    const selectClickLocationBase = async () => {
        if (cart === undefined || cartStore?.location === undefined) {
            return false
        }
        layout.setIsShowLoader(true)
        const cartServices = await addService(cart, bookableItem)
        await loadSelectedServices(cart, cartServices.services)
        if (hasOptions) {
            await setStep(Step.SelectOptions)
        } else {
            await setStep(Step.SelectedServices)
        }
        return true
    }

    const onSelectClickLocationFirst = async () => {
        await selectClickLocationBase()
    }

    const onSelectClickServiceFirst = async () => {
        const success = await selectClickLocationBase()
        if (success) {
            return
        }
        setLastSelectedBookableItem(bookableItem)
        await loadStoresForCartBookableItems([], bookableItem)
        await setStep(Step.ChooseLocation)
    }

    const onSelectClick = async () => {
        if (flowType === FlowType.SelectLocationFirst) {
            await onSelectClickLocationFirst()
        } else {
            await onSelectClickServiceFirst()
        }
    }

    const btnName = hasOptions ? 'Select options' : isCartAvailableBookableItem(bookableItem) ? 'Select specialist' : 'Select'

    return (
        <SelectableListItem
            captionComponent={<ServiceAvailableBookableItem bookableItem={bookableItem} />}
            priceComponent={
                <ServicePrice
                    bookableItem={bookableItem}
                    classesCardItemPrice={classes.cardItemPrice}
                />
            }
            onSelectClick={onSelectClick}
            btnName={btnName}
            btnWidth={155}
            description={bookableItem.description}
        />
    )
}
