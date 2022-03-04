import { Staff } from 'lib/state/staff/types'
import { Box } from '@mui/material'
import { useStaffErrorStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { useAllowChooseStaffError } from 'lib/state/staff'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'

interface Props {
    staff: Staff | undefined
}
export const StaffError = ({ staff }: Props) => {
    const classes = useStaffErrorStyles()
    const allowChooseStaffError = useAllowChooseStaffError()
    const { currentFlowStep } = useFlowStep()
    return (
        <>
            {!staff &&
                allowChooseStaffError &&
                currentFlowStep.step !== Step.SelectOptions && (
                    <Box className={classes.staffError}>
                        <Box className={classes.staffErrorIconInline}>!</Box>
                        <Box component="span">
                            Choose a staff member to continue
                        </Box>
                    </Box>
                )}
        </>
    )
}
