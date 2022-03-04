import { Cart, CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { Step } from 'lib/state/booking-flow/types'
import {
    Flow,
    getAvailableStepBase,
    getMaxAvailableStepBase,
} from 'components/molecules/CartInitializer/Flow'

enum AvailableSteps {
    SelectService = 0,
    ChooseLocation = 1,
    SelectedServices = 2,
    ChooseDate = 1 << 3,
    PersonalInfo = 1 << 4,
    PayAndConfirm = 1 << 5,
    All = ~(~0 << 6),
}

export const useServiceFirst = () => {
    const getAvailableStep = (
        cart: Cart,
        location: Location | undefined,
        selectedItems: CartBookableItem[] | undefined
    ): AvailableSteps => {
        let availableStep = AvailableSteps.SelectService
        if (!selectedItems || selectedItems.length === 0) {
            return availableStep
        }

        availableStep = AvailableSteps.ChooseLocation
        if (location === undefined) {
            return availableStep
        }

        return getAvailableStepBase(
            cart,
            selectedItems,
            AvailableSteps.SelectedServices,
            AvailableSteps.ChooseDate,
            AvailableSteps.PersonalInfo,
            AvailableSteps.All
        )
    }

    const getMaxAvailableStepInternal = (availableStep: AvailableSteps) => {
        const step = getMaxAvailableStepBase(
            availableStep,
            AvailableSteps.PersonalInfo,
            AvailableSteps.ChooseDate,
            AvailableSteps.SelectedServices,
            AvailableSteps.PayAndConfirm
        )

        if (step) {
            return step
        }

        if (
            (availableStep & AvailableSteps.ChooseLocation) ===
            AvailableSteps.ChooseLocation
        ) {
            return Step.ChooseLocation
        }

        return Step.SelectService
    }

    const getMaxAvailableStep = (
        cart: Cart,
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ): Step => {
        const availableStep = getAvailableStep(cart, location, selectedServices)
        return getMaxAvailableStepInternal(availableStep)
    }

    const getInitialStep = (
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ): Step => {
        return selectedServices && selectedServices.length > 0
            ? Step.ChooseLocation
            : Step.SelectService
    }

    const isCreateEmptyCart = () => {
        return true
    }

    return {
        getMaxAvailableStep: getMaxAvailableStep,
        getInitialStep: getInitialStep,
        isCreateEmptyCart: isCreateEmptyCart,
    } as Flow
}
