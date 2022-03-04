import { Button } from '@mui/material'
import { Checked } from 'components/icons/Checked'
import { theme } from 'styles/theme'
import formatDateFns from 'lib/utils/formatDateFns'
import { useSelectedStaffTimeState } from 'lib/state/staffTime'
import { Store } from 'lib/state/store/types'

interface Props {
    store: Store | undefined
}

export const SelectedTime = ({ store }: Props) => {
    const selectedStaffTime = useSelectedStaffTimeState()

    return (
        <Button
            variant="text"
            color="secondary"
            startIcon={<Checked color={theme.palette.primary.main} />}
            sx={{
                width: 'auto',
                padding: theme.spacing(0, 2),
                marginRight: '8px',
                marginTop: '-3px',
            }}
        >
            {formatDateFns(
                selectedStaffTime?.locationTime,
                store?.location.tz,
                'h:mmaaa'
            )}
        </Button>
    )
}
