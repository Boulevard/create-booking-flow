import { useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import DayPicker from 'react-day-picker'
import { Theme, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import 'react-day-picker/lib/style.css'
import { useCartState } from 'lib/state/cart'
import { useCartStoreState } from 'lib/state/store'
import { useStaffDates } from 'lib/state/staffDate'
import { CartBookableDate } from '@boulevard/blvd-book-sdk/lib/cart'

const useStyles = makeStyles((theme: Theme) => ({
    dayPickerWrapper: {
        backgroundColor: '#ffffff',
        boxShadow:
            '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        width: '310px',
        height: '323px',
        padding: theme.spacing(3, 1, 1, 1),
    },
    calendarDayPicker: {
        width: '100%',
        height: '100%',
        '& .DayPicker-Caption': {
            padding: '0 10px !important',
            '& div': {
                fontWeight: 'normal !important',
                fontSize: '16px !important',
                textTransform: 'capitalize',
            },
        },
        '& .DayPicker-WeekdaysRow': {
            justifyContent: 'space-between',
        },
        '& .DayPicker-Weekday abbr': {
            fontSize: '12px',
        },
        '&.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover > div > div > div':
            {
                backgroundColor: '#e2e8ed !important',
                borderRadius: '50% !important',
                color: '#33343C !important',
            },
    },
    calendarDayCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    notAvailable: {
        '& div > div': {
            textDecoration: 'line-through',
            color: '#C3C7CF',
        },
    },
    disabled: {
        '& div > div': {
            color: '#C3C7CF',
        },
    },
    dateWrapper: {
        display: 'inline-block',
        width: '36px',
        height: '36px',
        lineHeight: '35px',
        marginTop: '-15px',
        boxSizing: 'content-box',
        fontSize: '14px',
        fontWeight: 400,
    },
    today: {
        color: '#33343C !important',
        textDecoration: 'underline !important',
        textUnderlineOffset: '2px !important',
        textDecorationThickness: '2px !important',
        fontWeight: 'bold!important' as any,
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
        color: `${theme.palette.primary.contrastText} !important`,
    },
    calendarDayDate: {
        height: 0,
        lineHeight: 0,
    },
}))

interface Props {
    onDayClick: (day: Date, cartBookableDate: CartBookableDate) => void
    filteredDate?: Date
}

export const SelectDate = ({ onDayClick, filteredDate }: Props) => {
    const classes = useStyles()
    const fromMonth = new Date()
    fromMonth.setHours(0, 0, 0, 0)

    const cartState = useCartState()
    const cartStoreState = useCartStoreState()
    const [displayedMonth, setDisplayedMonth] = useState(
        filteredDate ?? new Date()
    )
    const { loadStaffDates, getStaffDateState } = useStaffDates()
    const staffDatesStore = getStaffDateState()
    const weekdaysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const [refresher, setRefresher] = useState(0)
    const onMonthChange = async (date: Date) => {
        setDisplayedMonth(date)
        await loadStaffDates(
            date.getFullYear(),
            date.getMonth(),
            cartState,
            cartStoreState?.location.tz
        )
        setRefresher(refresher + 1) //that forces the control to be refreshed and display available dates
    }

    const getAllowedDaysInMonth = (day: Date) => {
        if (staffDatesStore === undefined) {
            return []
        }
        return staffDatesStore
            .filter(
                (x) =>
                    x.month === day.getUTCMonth() &&
                    x.year === day.getUTCFullYear()
            )
            .flatMap((x) => x.dates)
    }

    const handleDayClick = async (day, modifiers: DayModifiers) => {
        if (modifiers.disabled) {
            return
        }
        const daysInMonth = getAllowedDaysInMonth(day)
        const selectedDays = daysInMonth.filter(
            (x) =>
                x.date.getUTCDate() === day.getUTCDate() &&
                x.date.getUTCMonth() === day.getUTCMonth() &&
                x.date.getUTCFullYear() == day.getUTCFullYear()
        )
        if (selectedDays.length === 0) {
            return
        }

        onDayClick(day, selectedDays[0].cartBookableDate)
    }

    const isDisabled = (day: Date) => {
        if (day < fromMonth) {
            return true
        }
        const daysInMonth = getAllowedDaysInMonth(day)
        const hasDay = daysInMonth.filter(
            (x) => x.date.getUTCDate() === day.getUTCDate()
        )
        return hasDay.length === 0
    }

    const renderDay = (day: Date, modifiers: any) => {
        let dayClassName = classes.calendarDayCell
        let dateWrapperClassName = classes.dateWrapper
        if (day < fromMonth && modifiers?.disabled) {
            dayClassName += ` ${classes.disabled}`
        }
        if (day > fromMonth && modifiers?.disabled) {
            dayClassName += ` ${classes.notAvailable}`
        }
        if (modifiers?.today) {
            dateWrapperClassName += ` ${classes.today}`
        }
        if (modifiers?.selected) {
            dateWrapperClassName += ` ${classes.selected}`
        }

        return (
            <div className={dayClassName}>
                <div className={classes.calendarDayDate}>
                    <div className={dateWrapperClassName}>{day.getDate()}</div>
                </div>
            </div>
        )
    }
    return (
        <Box className={classes.dayPickerWrapper}>
            <DayPicker
                month={displayedMonth}
                className={classes.calendarDayPicker}
                fromMonth={new Date()}
                selectedDays={filteredDate}
                weekdaysShort={weekdaysShort}
                disabledDays={isDisabled}
                onMonthChange={onMonthChange}
                onDayClick={handleDayClick}
                renderDay={renderDay}
            />
        </Box>
    )
}
