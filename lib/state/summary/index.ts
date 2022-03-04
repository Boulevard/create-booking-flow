import { atom, useRecoilState, useSetRecoilState } from 'recoil'

const isSummaryBlockOpen = atom<boolean>({
    key: 'isSummaryBlockOpen',
    default: false,
})

export const useIsSummaryBlockOpenState = () =>
    useRecoilState(isSummaryBlockOpen)
export const useSetIsSummaryBlockOpenState = () =>
    useSetRecoilState(isSummaryBlockOpen)
