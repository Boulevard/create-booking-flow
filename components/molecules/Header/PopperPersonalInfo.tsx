import { Step } from 'lib/state/booking-flow/types'
import { usePersonalInformationState } from 'lib/state/personal-info'
import React from 'react'
import { User } from 'components/icons'
import { PopperItemBase } from 'components/molecules/Header/PopperItemBase'

interface Props {
    handleClose: () => void
}

export const PopperPersonalInfo = ({handleClose}: Props) => {
    const [personalInformation] = usePersonalInformationState()
    const isSet = !!personalInformation.firstName && !!personalInformation.lastName

    return (
        <PopperItemBase handleClose={handleClose}
                        step={Step.PersonalInfo}
                        text={isSet ? `${personalInformation.firstName} ${personalInformation.lastName}` : 'Pending'}
                        icon={<User/>}
                        editable={isSet}
        />
    )
}
