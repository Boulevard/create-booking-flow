import { BlockRenderer } from './BlockRenderer'
import { useFlowStep } from 'lib/state/booking-flow'

export const BlockContainer = () => {
    const { currentFlowStep } = useFlowStep()
    return (
        <BlockRenderer key={currentFlowStep.step} flowStep={currentFlowStep} />
    )
}
