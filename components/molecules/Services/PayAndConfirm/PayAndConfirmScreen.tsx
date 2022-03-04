import WithLayout from 'components/atoms/layout/WithLayout'
import PaymentAndTerms from 'components/molecules/Services/PayAndConfirm/PaymentAndTerms'
import { Step } from 'lib/state/booking-flow/types'
import { useMobile } from 'lib/utils/useMobile'

export default function PayAndConfirmScreen() {
    const { isMobile } = useMobile()

    return (
        <WithLayout
            isShowLoader={false}
            leftPanel={<></>}
            rightPanel={<PaymentAndTerms />}
            rightPanelCaption="Confirm and pay"
            addBackArrow={isMobile}
            backArrowStep={Step.PersonalInfo}
        />
    )
}
