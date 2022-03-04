import React, { useState } from 'react'
import { Typography, Box, Button, Popover, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { SelectTime } from 'components/molecules/Services/ChooseDate/ManyDays/SelectTime'
import {
    useStaffTimes,
    useStaffTimesState,
    useTimesAreLoadingState,
} from 'lib/state/staffTime'
import { useCartStoreState } from 'lib/state/store'
import { SelectDate } from 'components/molecules/Services/ChooseDate/SelectDate'
import { isSameDay } from 'date-fns'
import { CartBookableDate } from '@boulevard/blvd-book-sdk/lib/cart'
import { useCartState } from 'lib/state/cart'
import { sortByDate } from 'lib/utils/sortUtils'
import formatDateFns from 'lib/utils/formatDateFns'
import { useMobile } from 'lib/utils/useMobile'
import { useTransition, animated, config } from 'react-spring'

const SelectDateButton = styled(Button)(() => ({
    width: 145,
    height: 36,
    border: 'none',
    color: '#33343C',
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: 'normal',
    '&:hover': {
        border: 'none',
        backgroundColor: '#ffffff00',
    },
}))

const LoadMoreButton = styled(Button)(() => ({
    width: 134,
    height: 38,
    borderColor: '#C3C7CF',
    borderRadius: 4,
    color: '#33343C',
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: 'normal',
    '&:hover': {
        borderColor: '#C3C7CF',
        backgroundColor: '#F9F9FB',
    },
}))

interface StylesProps {
    isMobile: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    selectTimeDesktop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(1),
    },
    selectTimeHeaderMobile: {
        position: 'fixed',
        top: '96px',
        width: '100%',
        backgroundColor: '#ffffff',
        'z-index': '1000',
        padding: '16px 16px 8px 16px',
        margin: '0 -16px',
        display: 'flex',
    },
    selectTimesBlock: {
        height: 'calc(100% - 44px)',
        margin: (props: StylesProps) => (props.isMobile ? '0 -16px' : 0),
        paddingTop: (props: StylesProps) => (props.isMobile ? '142px' : 0),
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    popover: {
        '& .MuiPopover-paper': {
            borderRadius: '8px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
        },
    },
}))

export const SelectAvailability = () => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    const staffTimesArray = useStaffTimesState()
    const selectedStore = useCartStoreState()
    const [anchorEl, setAnchorEl] = useState(null)
    const [changeOpacity, setChangeOpacity] = useState(false)
    const [filteredDate, setFilteredDate] = useState<Date | undefined>(
        undefined
    )
    const [isShowSeeMoreButton, setIsShowSeeMoreButton] = useState(true)
    const { loadStaffTimes, loadNextTimesPage } = useStaffTimes()
    const cart = useCartState()
    const timesAreLoading = useTimesAreLoadingState()
    const sortedSelectTimes = staffTimesArray
        .concat()
        .filter((x) => {
            return filteredDate === undefined || isSameDay(filteredDate, x.date)
        })
        .sort(sortByDate)

    const handleSelectDateButtonClick = (event) => {
        setChangeOpacity(true)
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const onDayClick = async (
        day: Date,
        cartBookableDate: CartBookableDate
    ) => {
        handleClose()
        setFilteredDate(day)

        const staffDate = {
            date: day,
            cartBookableDate: cartBookableDate,
        }
        await loadStaffTimes(cart, staffDate, selectedStore?.location.tz)
    }

    const onClearDateClick = () => {
        setFilteredDate(undefined)
    }

    const seeMoreDays = async () => {
        setChangeOpacity(false)
        const hasMoreDays = await loadNextTimesPage(
            cart,
            selectedStore?.location.tz
        )
        setIsShowSeeMoreButton(hasMoreDays)
    }

    const maxHeightValue = 200

    const transition = useTransition(sortedSelectTimes, {
        from: { opacity: changeOpacity ? 0 : 1, maxHeight: 0 },
        enter: { opacity: 1, maxHeight: maxHeightValue },
        leave: {
            opacity: 0,
            maxHeight: 0,
            config: { ...config.stiff, duration: 500 },
        },
        config: () => ({
            ...config.stiff,
            duration: filteredDate ? 0 : 1000,
        }),
        keys: (staffTimes) =>
            `selectTimeTransition-${staffTimes.day}-${staffTimes.month}-${staffTimes.year}`,
    })

    return (
        <>
            <Box
                className={
                    isMobile
                        ? classes.selectTimeHeaderMobile
                        : classes.selectTimeDesktop
                }
            >
                <Typography variant="h2">Select a Time</Typography>
                <SelectDateButton
                    variant="outlined"
                    disableRipple={true}
                    startIcon={<FiCalendar size={18} />}
                    endIcon={
                        !anchorEl ? (
                            <FiChevronDown size={15} />
                        ) : (
                            <FiChevronUp size={15} />
                        )
                    }
                    onClick={handleSelectDateButtonClick}
                >
                    {filteredDate
                        ? formatDateFns(
                              filteredDate,
                              selectedStore?.location.tz,
                              'MM/dd/yyyy'
                          )
                        : 'Select date'}
                </SelectDateButton>
                <Popover
                    id={id}
                    className={classes.popover}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{ mt: 1, '& .MuiPaper-root': { width: 352 } }}
                >
                    <SelectDate
                        onDayClick={onDayClick}
                        filteredDate={filteredDate}
                    />
                </Popover>
            </Box>
            <Box className={classes.selectTimesBlock}>
                {transition(({ maxHeight, ...restStyle }, staffTimes) => (
                    <animated.div
                        style={{
                            ...restStyle,
                            maxHeight: maxHeight.to((x) => {
                                if (x < 5 && filteredDate) {
                                    return `0px`
                                }
                                return x > maxHeightValue - 10
                                    ? '100%'
                                    : `${x}px`
                            }),
                            overflow: maxHeight.to((x) =>
                                x > maxHeightValue - 10 ? '' : `hidden`
                            ),
                        }}
                        key={`selectTimeAnimated-${staffTimes.day}-${staffTimes.month}-${staffTimes.year}`}
                    >
                        <SelectTime
                            store={selectedStore}
                            staffTimes={staffTimes}
                            onClearDateClick={onClearDateClick}
                            filteredDate={filteredDate}
                            key={`selectTime-${staffTimes.day}-${staffTimes.month}-${staffTimes.year}`}
                        />
                    </animated.div>
                ))}
                {!filteredDate && isShowSeeMoreButton && !timesAreLoading && (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <LoadMoreButton
                            variant="outlined"
                            onClick={seeMoreDays}
                            sx={{ mt: 5, mb: 3, borderRadius: 0 }}
                        >
                            Load more days
                        </LoadMoreButton>
                    </Box>
                )}
            </Box>
        </>
    )
}
