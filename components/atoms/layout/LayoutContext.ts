import { createContext } from 'react'

export interface Context {
    showBottom: boolean
    isShowLoader: boolean
    isBlurScreen: boolean
    setShowBottom: (showBottom: boolean) => void
    setIsShowLoader: (isShowLoader: boolean) => void
    setIsBlurScreen: (isBlurScreen: boolean) => void
    setOnRightPanelBtnClick: (onRightPanelBtnClick: () => void) => void
    setHideLeftPanel: (hideLeftPanel: boolean) => void
    setHideRightPanel: (hideRightPanel: boolean) => void
    setShowLeftBottom: (showLeftBottom: boolean) => void
}

const defaultValue: Context = {
    showBottom: false,
    isShowLoader: false,
    isBlurScreen: false,
    setShowBottom: () => {},
    setIsShowLoader: () => {},
    setIsBlurScreen: () => {},
    setOnRightPanelBtnClick: () => {},
    setHideLeftPanel: () => {},
    setHideRightPanel: () => {},
    setShowLeftBottom: () => {},
}
export const LayoutContext = createContext<Context>(defaultValue)
