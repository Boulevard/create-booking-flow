import {
    atom,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import { StaffTime, StaffTimes } from 'lib/state/staffTime/types'
import { Cart, CartBookableTime } from '@boulevard/blvd-book-sdk/lib/cart'
import { StaffDate } from 'lib/state/staffDate/types'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { useResetStaffDatesStore, useStaffDates } from 'lib/state/staffDate'
import { isAfter } from 'date-fns'
import { Location } from '@boulevard/blvd-book-sdk/lib/locations'
import { sortByDate } from 'lib/utils/sortUtils'
import { DateTimeType, useAppConfig } from 'lib/state/config'

export const staffTimesState = atom<StaffTimes[]>({
    key: 'staffTimesState',
    default: [],
})

export const timesAreLoadingState = atom<boolean>({
    key: 'timesAreLoadingState',
    default: true,
})

export const loadingStaffTimeState = atom<boolean>({
    key: 'loadingStaffTimeState',
    default: false,
})

export const selectedStaffTimeState = atom<StaffTime | undefined>({
    key: 'selectedStaffTimeState',
    default: undefined,
})

export const useStaffTimesState = () => useRecoilValue(staffTimesState)
export const useResetStaffTimesState = () =>
    useResetRecoilState(staffTimesState)

export const useSelectedStaffTimeState = () =>
    useRecoilValue(selectedStaffTimeState)
export const useSetSelectedStaffTimeState = () =>
    useSetRecoilState(selectedStaffTimeState)
export const useResetSelectedStaffTimeState = () =>
    useResetRecoilState(selectedStaffTimeState)

export const cartBookableTimeToStaffTime = (
    startTime: any,
    locationTz: string,
    cartBookableTime?: CartBookableTime
) => {
    return {
        startTime: new Date(startTime),
        localTime: utcToZonedTime(
            startTime,
            Intl.DateTimeFormat().resolvedOptions().timeZone
        ),
        locationTime: utcToZonedTime(startTime, locationTz),
        cartBookableTime: cartBookableTime,
    } as StaffTime
}

export const useStaffTimes = () => {
    const { getMinimumDate } = useStaffDates()
    const {
        loadStaffDates,
        cartBookableDateToStaffDate,
        getFirstAvailableDayAfterTheDate,
        getStaffDateState,
    } = useStaffDates()
    const staffDatesStore = getStaffDateState()
    const staffTimes = useStaffTimesState()
    const setTimesAreLoadingState = useSetTimesAreLoadingState()
    const resetStaffDatesStore = useResetStaffDatesStore()
    const resetStaffTimesState = useResetStaffTimesState()
    const resetSelectedStaffTimeState = useResetSelectedStaffTimeState()
    const { getDateTimeType } = useAppConfig()
    const addStaffTimes = useRecoilCallback(
        ({ set }) =>
            (
                cartBookableTimes: CartBookableTime[],
                locationTz: string,
                minimumDate: Date
            ) => {
                const times = cartBookableTimes
                    .map((x) =>
                        cartBookableTimeToStaffTime(x.startTime, locationTz, x)
                    )
                    .filter((x) => isAfter(x.locationTime, minimumDate))

                const yearArrays = times.map((x) =>
                    x.locationTime.getFullYear()
                )
                const years = [...new Set(yearArrays)]

                years.forEach((year) => {
                    const monthArrays = times
                        .filter((x) => x.locationTime.getFullYear() === year)
                        .map((x) => x.locationTime.getMonth())
                    const months = [...new Set(monthArrays)]
                    months.forEach((month) => {
                        const dayArrays = times
                            .filter(
                                (x) =>
                                    x.locationTime.getMonth() === month &&
                                    x.locationTime.getFullYear() === year
                            )
                            .map((x) => x.locationTime.getDate())
                        const days = [...new Set(dayArrays)]
                        days.forEach((day) => {
                            //suppose we get the whole day from the server
                            const dayTimes = times.filter(
                                (x) =>
                                    x.locationTime.getMonth() === month &&
                                    x.locationTime.getFullYear() === year &&
                                    x.locationTime.getDate() === day
                            )
                            set(staffTimesState, (prevItems) =>
                                prevItems
                                    .filter(
                                        (x) =>
                                            !(
                                                x.year === year &&
                                                x.month === month &&
                                                x.day === day
                                            )
                                    )
                                    .concat({
                                        month: month,
                                        times: dayTimes,
                                        year: year,
                                        day: day,
                                        date: new Date(year, month, day),
                                    })
                            )
                        })
                    })
                })
            },
        []
    )

    const clearStaffTimes = useRecoilCallback(
        ({ reset }) =>
            () => {
                reset(staffTimesState)
            },
        []
    )

    const loadStaffTimes = async (
        cart: Cart | undefined,
        staffDate: StaffDate | undefined,
        locationTz: string
    ): Promise<CartBookableTime[] | undefined> => {
        if (!cart || !staffDate || !staffDate.cartBookableDate) {
            return
        }
        try {
            const times = await cart.getBookableTimes(
                staffDate.cartBookableDate,
                {
                    timezone: locationTz,
                }
            )
            if (times === undefined) {
                return
            }
            const minimumDate = getMinimumDate(locationTz)
            addStaffTimes(times, locationTz, minimumDate)
            return times
        } catch (e) {
            console.error(e)
        }
    }

    const timePageSize = 10
    const loadStaffTimesByStaffDates = (
        cart: Cart | undefined,
        locationTz: string,
        staffDates: StaffDate[]
    ) => {
        setTimesAreLoadingState(true)
        staffDates
            .reduce(
                (p, staffDate) =>
                    p.then((_) => loadStaffTimes(cart, staffDate, locationTz)),
                Promise.resolve()
            )
            .finally(() => {
                setTimesAreLoadingState(false)
            })
    }

    const forceLoadDatesAndTimes = async (
        cart: Cart,
        location: Location,
        date: Date
    ) => {
        resetStaffDatesStore()
        resetStaffTimesState()
        resetSelectedStaffTimeState()
        await loadDatesAndTimes(cart, location, date)
    }

    const loadDatesAndTimes = async (
        cart: Cart,
        location: Location,
        date: Date
    ) => {
        const cartBookableDates = await loadStaffDates(
            date.getFullYear(),
            date.getMonth(),
            cart,
            location.tz
        )
        const staffDates = cartBookableDates
            .map((x) => cartBookableDateToStaffDate(x))
            .sort(sortByDate)
            .slice(0, timePageSize)

        const dateTimeType = getDateTimeType()
        if (dateTimeType === DateTimeType.ShowTimeForOneDay) {
            if (staffDates.length > 0) {
                const staffDate = staffDates[0]
                await loadStaffTimes(cart, staffDate, location.tz)
            }
            return
        }

        loadStaffTimesByStaffDates(cart, location.tz, staffDates)
    }

    const loadNextTimesPage = async (
        cart: Cart | undefined,
        locationTz: string
    ): Promise<boolean> => {
        if (
            cart === undefined ||
            staffTimes.length === 0 ||
            staffDatesStore === undefined ||
            staffDatesStore.length === 0
        ) {
            return false
        }

        // get the list of dates
        // sortedStaffDatesStore contains list of available dates.
        const lastLoadedDate = staffTimes[staffTimes.length - 1].date
        lastLoadedDate.setHours(staffDatesStore[0].dates[0].date.getHours())
        const sortedStaffDatesStore = staffDatesStore
            .flatMap((x) => x.dates)
            .sort(sortByDate)
        let staffDates = sortedStaffDatesStore
            .filter((x) => isAfter(x.date, lastLoadedDate))
            .slice(0, timePageSize)

        if (staffDates.length < timePageSize) {
            // if number of available dates is less than page size then we should get more available days from the server

            // to get next available dates we need to determine the next month to load data
            const lastStaffDate =
                sortedStaffDatesStore[sortedStaffDatesStore.length - 1].date
            const nextMonthDate = new Date(
                lastStaffDate.getFullYear(),
                lastStaffDate.getMonth() + 1,
                1
            )
            let cartBookableDates = await loadStaffDates(
                nextMonthDate.getFullYear(),
                nextMonthDate.getMonth(),
                cart,
                locationTz
            )
            if (cartBookableDates.length === 0) {
                //if next month doesn't have available days - get first available day after next month
                const firstAvailableDay =
                    await getFirstAvailableDayAfterTheDate(
                        cart,
                        locationTz,
                        nextMonthDate
                    )
                if (firstAvailableDay !== undefined) {
                    // if available day exists then load days for the month of the available day
                    const dateToLoad = zonedTimeToUtc(
                        firstAvailableDay.date,
                        locationTz
                    )
                    cartBookableDates = await loadStaffDates(
                        dateToLoad.getFullYear(),
                        dateToLoad.getMonth(),
                        cart,
                        locationTz
                    )
                }
            }

            staffDates = staffDates
                .concat(
                    cartBookableDates.map((x) => cartBookableDateToStaffDate(x))
                )
                .sort(sortByDate)
                .slice(0, timePageSize)
        }

        loadStaffTimesByStaffDates(cart, locationTz, staffDates)
        // return true if we were able to get number of days equals to page size. Otherwise return false - meaning there is no more days
        return staffDates.length >= timePageSize
    }

    return {
        clearStaffTimes,
        loadStaffTimes: loadStaffTimes,
        loadDatesAndTimes: loadDatesAndTimes,
        timePageSize: timePageSize,
        loadNextTimesPage: loadNextTimesPage,
        forceLoadDatesAndTimes: forceLoadDatesAndTimes,
    }
}

export const useTimesAreLoadingState = () =>
    useRecoilValue(timesAreLoadingState)
export const useSetTimesAreLoadingState = () =>
    useSetRecoilState(timesAreLoadingState)

export const useLoadingStaffTimeState = () =>
    useRecoilValue(loadingStaffTimeState)
export const useSetLoadingStaffTimeState = () =>
    useSetRecoilState(loadingStaffTimeState)
