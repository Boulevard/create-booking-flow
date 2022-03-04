import { RightPanel } from 'components/molecules/Services/ChooseLocation/RightPanel'
import { LeftPanel } from 'components/molecules/Services/ChooseLocation/LeftPanel'
import WithLayout from 'components/atoms/layout/WithLayout'

export default function ChooseLocationScreen() {
    return (
        <WithLayout
            isShowLoader={false}
            leftPanel={<LeftPanel/>}
            rightPanel={<RightPanel />}
        />
    )
}
