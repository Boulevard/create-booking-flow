import { FlowType, useAppConfig } from 'lib/state/config'
import { useLocationFirst } from 'components/molecules/CartInitializer/LocationFirst'
import { useServiceFirst } from 'components/molecules/CartInitializer/ServiceFirst'
import { Flow } from 'components/molecules/CartInitializer/Flow'
import { Cart, CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Location } from '@boulevard/blvd-book-sdk/lib/locations'

export const useFlowFactory = () => {
    const { getFlowType } = useAppConfig()
    const flowType = getFlowType()
    const locationFirst = useLocationFirst()
    const serviceFirst = useServiceFirst()

    const getFlow = (): Flow => {
        if (flowType === FlowType.SelectLocationFirst) {
            return locationFirst
        }
        return serviceFirst
    }

    const getMaxAvailableStep = (
        cart: Cart,
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ) => {
        return getFlow().getMaxAvailableStep(cart, location, selectedServices)
    }

    const getInitialStep = (
        location: Location | undefined,
        selectedServices: CartBookableItem[] | undefined
    ) => {
        return getFlow().getInitialStep(location, selectedServices)
    }

    const isCreateEmptyCart = () => {
        return getFlow().isCreateEmptyCart()
    }

    return {
        getMaxAvailableStep: getMaxAvailableStep,
        getInitialStep: getInitialStep,
        isCreateEmptyCart: isCreateEmptyCart,
    }
}
