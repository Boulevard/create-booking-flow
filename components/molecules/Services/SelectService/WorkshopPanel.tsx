import { useMobile } from 'lib/utils/useMobile'
import { useContext, useEffect } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

export const WorkshopPanel = () => {
    const { isMobile } = useMobile()
    const layout = useContext(LayoutContext)

    useEffect(() => {
        layout.setHideLeftPanel(false)
        layout.setHideRightPanel(isMobile)
        // eslint-disable-next-line
    }, [isMobile])
    return <></>
}
