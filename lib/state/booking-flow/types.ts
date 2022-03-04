export enum Step {
    LoadingStep,
    ChooseLocation,
    SelectService,
    SelectOptions,
    SelectedServices,
    ChooseDate,
    PersonalInfo,
    PayAndConfirm,
    BookingSuccess,
}

export interface Types {
    step: Step
}

export const initialStep: Step = Step.LoadingStep
