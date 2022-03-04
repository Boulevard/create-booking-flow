import { LocationPin } from 'components/icons/LocationPin'
import { useCartStoreState } from 'lib/state/store'
import { getLocationName } from 'lib/utils/locationUtils'
import { Step } from 'lib/state/booking-flow/types'
import { PopperItemBase } from 'components/molecules/Header/PopperItemBase'

interface Props {
    handleClose: () => void
}

export const PopperLocation = ({handleClose}: Props) => {
    const selectedStore = useCartStoreState()

    return (
        <PopperItemBase handleClose={handleClose}
                        step={Step.ChooseLocation}
                        text={selectedStore ? getLocationName(selectedStore) : 'Pending'}
                        icon={<LocationPin/>}
                        editable={!!selectedStore}
        />
    )
}
