import {
    atom,
    useRecoilCallback,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil'
import { Types, Step, initialStep } from 'lib/state/booking-flow/types'
import { useRouter } from 'next/router'

const defaultFlowStep: Types = {
    step: Step.LoadingStep,
}

const flowStepState = atom<Types>({
    key: 'flowStep',
    default: defaultFlowStep,
})

export default flowStepState

export const useFlowStepState = () => useRecoilValue(flowStepState)
export const useSetFlowStepState = () => useSetRecoilState(flowStepState)

export const useFlowStep = () => {
    const router = useRouter()
    const currentFlowStep = useRecoilValue(flowStepState)
    const setRecoilStep = useRecoilCallback(
        ({ set }) =>
            (step: Step) => {
                set(flowStepState, (oldValue: Types) => {
                    return { ...oldValue, step: step }
                })
            },
        []
    )

    const setStepForce = async (step: Step) => {
        if (step === initialStep) {
            await router.push(`#`)
        } else {
            await router.push(`#${Step[step]}`)
        }
    }

    const setStep = async (step: Step) => {
        if (currentFlowStep.step === step) {
            return
        }
        await setStepForce(step)
    }

    return {
        currentFlowStep,
        setStep: setStep,
        setRecoilStep,
        setStepForce: setStepForce,
    }
}
