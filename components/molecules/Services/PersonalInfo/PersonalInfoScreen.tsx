import WithLayout from 'components/atoms/layout/WithLayout'
import YourAndAdditionalInfo from 'components/molecules/Services/PersonalInfo/YourAndAdditionalInfo'
import { Step } from 'lib/state/booking-flow/types'
import { useMobile } from 'lib/utils/useMobile'

export default function PersonalInfoScreen() {
    const { isMobile } = useMobile()

    return (
        <WithLayout
            isShowLoader={false}
            leftPanel={<></>}
            rightPanel={<YourAndAdditionalInfo />}
            rightPanelCaption="Your information"
            rightPanelBtnCaption="Continue"
            showBottom={true}
            addBackArrow={isMobile}
            backArrowStep={Step.ChooseDate}
        />
    )
}
