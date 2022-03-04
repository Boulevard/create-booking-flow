import { SelectedServices } from 'components/molecules/Services/SelectedServices/SelectedServices'
import { Box } from '@mui/material'
import { useSelectedServicesScreenStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import WithLayout from 'components/atoms/layout/WithLayout'
import { useFlowStep } from 'lib/state/booking-flow'
import { Step } from 'lib/state/booking-flow/types'
import { RightPanel } from 'components/molecules/Services/SelectedServices/RightPanel'
import { WorkshopPanel } from 'components/molecules/Services/SelectedServices/WorkshopPanel'
import { useCartMethods } from 'lib/state/cart'
import { useActiveSelectedService, useSelectedServices } from 'lib/state/services'
import { useSelectedServiceChange } from 'components/molecules/Services/SelectedServices/useSelectedServiceChange'
import { useMobile } from 'lib/utils/useMobile'

export const SelectedServicesScreen = () => {
    const classes = useSelectedServicesScreenStyles()
    const { setStep } = useFlowStep()
    const { isMobile } = useMobile()
    const {isCartAvailableBookableItem} = useCartMethods()
    const activeSelectedService = useActiveSelectedService()
    const {handleServiceChange} = useSelectedServiceChange()
    const { selectedServicesStateValue } = useSelectedServices()
    const hasServices = selectedServicesStateValue.filter(x=>isCartAvailableBookableItem(x.item)).length > 0
    let rightPanelCaption = 'Select options'
    if (isMobile) {
        rightPanelCaption = ''
    } else if (hasServices) {
        rightPanelCaption = !isMobile && isCartAvailableBookableItem(activeSelectedService?.item) ? 'Select a specialist' : ''
    }

    const onLeftPanelBtnClick = async () => {
        await setStep(Step.SelectService)
    }

    return (
        <WithLayout
            isShowLoader={false}
            leftPanel={
                <Box className={classes.servicesRoot}>
                    <SelectedServices
                        handleServiceChange={handleServiceChange}
                    />
                </Box>
            }
            rightPanel={<RightPanel />}
            showBottom={false}
            rightPanelCaption={rightPanelCaption}
            rightPanelBtnCaption="Continue"
            leftPanelBtnCaption={'Add another'}
            onLeftPanelBtnClick={onLeftPanelBtnClick}
            workshopPanel={<WorkshopPanel />}
        />
    )
}
