import type { ComponentType } from 'react'
import { Types, Step } from 'lib/state/booking-flow/types'
import LoadingStep from 'components/blocks/LoadingStepBlock'
import ChooseLocation from 'components/blocks/ChooseLocationBlock'
import ChooseDate from 'components/blocks/ChooseDateBlock'
import PersonalInfo from 'components/blocks/PersonalInfoBlock'
import BookingSuccess from 'components/blocks/BookingSuccessBlock'
import PayAndConfirm from 'components/blocks/PayAndConfirmBlock'
import SelectServiceBlock from 'components/blocks/SelectServiceBlock'
import SelectedServicesBlock from 'components/blocks/SelectedServicesBlock'
import SelectOptionsBlock from 'components/blocks/SelectOptionsBlock'

export interface BaseBlockProps {}

const Blocks: Record<Step, ComponentType<BaseBlockProps>> = {
    [Step.LoadingStep]: LoadingStep,
    [Step.ChooseLocation]: ChooseLocation,
    [Step.SelectService]: SelectServiceBlock,
    [Step.SelectOptions]: SelectOptionsBlock,
    [Step.SelectedServices]: SelectedServicesBlock,
    [Step.ChooseDate]: ChooseDate,
    [Step.PersonalInfo]: PersonalInfo,
    [Step.PayAndConfirm]: PayAndConfirm,
    [Step.BookingSuccess]: BookingSuccess,
}

export const BlockRenderer = ({ flowStep }: { flowStep: Types }) => {
    const Component = Blocks[flowStep.step]
    if (!Component) throw new Error('Invalid block type: ' + flowStep.step)
    return <Component />
}
