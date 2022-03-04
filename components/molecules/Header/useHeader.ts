import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'

export const useHeader = () => {
    const { currentFlowStep } = useFlowStep()

    const getCurrentStepPercents = () => {
        let currentStep = 0
        let currentStepByPercent = 0
        if (currentFlowStep.step === Step.SelectService || currentFlowStep.step === Step.SelectOptions) {
            currentStep = 1
            currentStepByPercent = 17
        } else if (currentFlowStep.step === Step.SelectedServices) {
            currentStep = 2
            currentStepByPercent = 34
        } else if (currentFlowStep.step === Step.ChooseDate) {
            currentStep = 3
            currentStepByPercent = 50
        } else if (currentFlowStep.step === Step.PersonalInfo) {
            currentStep = 4
            currentStepByPercent = 67
        } else if (currentFlowStep.step === Step.PayAndConfirm) {
            currentStep = 5
            currentStepByPercent = 84
        } else if (currentFlowStep.step === Step.BookingSuccess) {
            currentStep = 6
            currentStepByPercent = 100
        }
        return { currentStepByPercent, currentStep }
    }

    return {
        getCurrentStepPercents: getCurrentStepPercents,
    }
}
