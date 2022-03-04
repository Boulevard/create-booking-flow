import { StaffTime } from 'lib/state/staffTime/types'
import { Store } from 'lib/state/store/types'
import { useSelectedStaffTimeState } from 'lib/state/staffTime'
import { SelectedTime } from 'components/molecules/Services/ChooseDate/SelectedTime'
import { Time } from 'components/molecules/Services/ChooseDate/Time'

interface Props {
    time: StaffTime
    store: Store | undefined
}

export const DisplayTime = ({ time, store }: Props) => {
    const selectedStaffTime = useSelectedStaffTimeState()
    if (time.cartBookableTime?.id === selectedStaffTime?.cartBookableTime?.id) {
        return <SelectedTime store={store} />
    }

    return <Time time={time} store={store} />
}
