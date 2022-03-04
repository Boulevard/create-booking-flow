import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { Step } from 'lib/state/booking-flow/types'
import { Cart, CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'

export interface Flow {
    getMaxAvailableStep(
        cart: Cart,
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ): Step
    getInitialStep(
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ): Step
    isCreateEmptyCart(): boolean
}

export const getAvailableStepBase = (
    cart: Cart,
    selectedItems: CartBookableItem[],
    selectedServicesStep: number,
    chooseDateStep: number,
    personalInfoStep: number,
    all: number
): number => {
    let availableStep = selectedServicesStep
    if (
        selectedItems.filter((x) => x.selectedStaffVariant == undefined)
            .length > 0
    ) {
        return availableStep
    }
    availableStep = chooseDateStep
    if (cart.startTime === undefined || cart.startTime === null) {
        return availableStep
    }

    availableStep = personalInfoStep
    for (let question of cart.bookingQuestions) {
        if (question.required && question.answer == undefined) {
            return availableStep
        }
    }
    if (
        cart.clientInformation == null ||
        !cart.clientInformation.email ||
        !cart.clientInformation.phoneNumber ||
        !cart.clientInformation.firstName ||
        !cart.clientInformation.lastName
    ) {
        return availableStep
    }

    return all
}

export const getMaxAvailableStepBase = (
    availableStep: number,
    personalInfoStep: number,
    chooseDateStep: number,
    selectedServicesStep: number,
    payAndConfirmStep: number
) => {
    if ((availableStep & payAndConfirmStep) === payAndConfirmStep) {
        return Step.PayAndConfirm
    }

    if ((availableStep & personalInfoStep) === personalInfoStep) {
        return Step.PersonalInfo
    }

    if ((availableStep & chooseDateStep) === chooseDateStep) {
        return Step.ChooseDate
    }

    if ((availableStep & selectedServicesStep) === selectedServicesStep) {
        return Step.SelectedServices
    }

    return undefined
}
