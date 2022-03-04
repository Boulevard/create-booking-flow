import { Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { StaffTimes } from 'lib/state/staffTime/types'
import formatDateFns from 'lib/utils/formatDateFns'
import { Store } from 'lib/state/store/types'
import { differenceInDays, isSameDay } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useMobile } from 'lib/utils/useMobile'
import { Time } from 'components/molecules/Services/ChooseDate/Time'
import { DisplayTime } from 'components/molecules/Services/ChooseDate/DisplayTime'

const useStyles = makeStyles(() => ({
    timeBlock: {
        borderBottom: '1px dashed #C3C7CF',
    },
    dayTopRow: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearDateSelection: {
        textDecoration: 'underline',
        cursor: 'pointer',
        marginLeft: '20px',
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
}))

interface Props {
    staffTimes: StaffTimes
    store: Store | undefined
    onClearDateClick: () => void
    filteredDate?: Date
}

export const SelectTime = ({
    staffTimes,
    store,
    onClearDateClick,
    filteredDate,
}: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles()
    const times = staffTimes.times
    const timeZone = store?.location.tz
    const currentDate = utcToZonedTime(new Date(), timeZone)
    currentDate.setHours(0)

    const getDifferenceInDaysText = (date: Date): string => {
        if (isSameDay(date, currentDate)) {
            return 'today'
        }
        const diff = differenceInDays(date, currentDate)
        return `${diff + 1}d away`
    }

    return (
        <Box sx={{ pt: 3, pb: 2 }} className={classes.timeBlock}>
            <Box
                className={classes.dayTopRow}
                sx={{ padding: isMobile ? '0 16px' : 0 }}
            >
                <Box>
                    <Typography variant="h3" component="span">
                        {formatDateFns(
                            staffTimes.date,
                            store?.location.tz,
                            'EEEE, MMM d'
                        )}
                    </Typography>
                    <Typography variant="body1" component="span" sx={{ pl: 1 }}>
                        {getDifferenceInDaysText(staffTimes.date)}
                    </Typography>
                </Box>
                {filteredDate && isSameDay(filteredDate!, staffTimes.date) && (
                    <Typography
                        variant="body1"
                        component="span"
                        className={classes.clearDateSelection}
                        onClick={onClearDateClick}
                    >
                        Clear date selection
                    </Typography>
                )}
            </Box>
            <Box
                className={classes.buttonsWrapper}
                sx={{ padding: isMobile ? '16px 16px 0 16px' : '16px 0 0 0' }}
            >
                {times.concat().map((time) => (
                    <DisplayTime
                        key={'time' + time.cartBookableTime?.id}
                        time={time}
                        store={store}
                    />
                ))}
            </Box>
        </Box>
    )
}
