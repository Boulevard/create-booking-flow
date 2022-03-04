import { Cart, CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { Step } from 'lib/state/booking-flow/types'
import {
    Flow,
    getAvailableStepBase,
    getMaxAvailableStepBase,
} from 'components/molecules/CartInitializer/Flow'

enum AvailableSteps {
    ChooseLocation = 0,
    SelectService = 1,
    SelectedServices = 2,
    ChooseDate = 1 << 3,
    PersonalInfo = 1 << 4,
    PayAndConfirm = 1 << 5,
    All = ~(~0 << 6),
}

export const useLocationFirst = () => {
    const getAvailableStep = (
        cart: Cart,
        location: Location | undefined,
        selectedItems: CartBookableItem[] | undefined
    ): AvailableSteps => {
        let availableStep = AvailableSteps.ChooseLocation
        if (location === undefined) {
            return availableStep
        }
        availableStep = AvailableSteps.SelectService
        if (!selectedItems || selectedItems.length === 0) {
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
            (availableStep & AvailableSteps.SelectService) ===
            AvailableSteps.SelectService
        ) {
            return Step.SelectService
        }

        return Step.ChooseLocation
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
        return location ? Step.SelectService : Step.ChooseLocation
    }

    const isCreateEmptyCart = () => {
        return false
    }

    return {
        getMaxAvailableStep: getMaxAvailableStep,
        getInitialStep: getInitialStep,
        isCreateEmptyCart: isCreateEmptyCart,
    } as Flow
}
