import {
    atom,
    useRecoilState,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import { PersonalInformation } from './types'

const personalInformationState = atom<PersonalInformation>({
    key: 'personalInformationState',
    default: {
        firstName: '',
        email: '',
        lastName: '',
        phone: '',
    },
})

export const usePersonalInformationState = () =>
    useRecoilState(personalInformationState)
export const useSetPersonalInformationState = () =>
    useSetRecoilState(personalInformationState)
export const useResetPersonalInformationState = () =>
    useResetRecoilState(personalInformationState)
