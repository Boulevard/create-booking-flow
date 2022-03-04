import { StaffTime } from 'lib/state/staffTime/types'
import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { Store } from 'lib/state/store/types'
import { DisplayTime } from 'components/molecules/Services/ChooseDate/DisplayTime'

interface Props {
    staffTimes: StaffTime[]
    dayTimeName: string
    store: Store | undefined
}

const useStyles = makeStyles(() => ({
    timeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        paddingTop: '10px',
    },
    dayTimeBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '10px',
        width: '100%',
        paddingBottom: '5px',
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
}))

export const DayTimes = ({ staffTimes, dayTimeName, store }: Props) => {
    const classes = useStyles()

    return (
        <Box className={classes.timeContainer}>
            <Box className={classes.dayTimeBlock}>
                <Box
                    sx={{
                        fontWeight: 500,
                    }}
                >
                    {dayTimeName}
                </Box>
            </Box>
            <Box className={classes.buttonsWrapper}>
                {staffTimes.length > 0 &&
                    staffTimes.map((time) => (
                        <DisplayTime
                            key={'time' + time.cartBookableTime?.id}
                            time={time}
                            store={store}
                        />
                    ))}
                {staffTimes.length === 0 && (
                    <Typography fontWeight={500} color={'#C4C4C4'}>
                        Unavailable
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
