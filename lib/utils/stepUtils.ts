import { Step } from 'lib/state/booking-flow/types'

export const getStepFromPath = (pathname: string, initialStep: Step) => {
    const parts = pathname.split('#')
    let step = initialStep
    if (parts.length > 1) {
        const hash = parts.pop()
        step = Step[hash!]
    }
    return step ? step : initialStep
}
