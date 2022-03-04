import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { ErrorType } from './enums'

export const errorMessageType = atom<ErrorType>({
    key: 'errorMessageType',
    default: ErrorType.NoError,
})

export const useErrorMessage = () => useRecoilValue(errorMessageType)
export const useErrorMessageType = () => useRecoilState(errorMessageType)
