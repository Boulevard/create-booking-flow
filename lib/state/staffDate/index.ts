import {
    atom,
    useRecoilCallback,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import {
    SelectedStaffDate,
    StaffDate,
    StaffDates,
} from 'lib/state/staffDate/types'
import { Cart, CartBookableDate } from '@boulevard/blvd-book-sdk/lib/cart'
import formatDateFns from 'lib/utils/formatDateFns'
import { utcToZonedTime } from 'date-fns-tz'
import { addHours, isAfter } from 'date-fns'

export const staffDatesState = atom<StaffDates[]>({
    key: 'staffDatesState',
    default: [],
})

export const selectedStaffDateState = atom<SelectedStaffDate | undefined>({
    key: 'selectedStaffDateState',
    default: undefined,
})

export const useResetStaffDatesStore = () =>
    useResetRecoilState(staffDatesState)

export const useStaffDates = () => {
    const cartBookableDateToStaffDate = (
        cartBookableDate: CartBookableDate
    ): StaffDate => {
        return {
            date: new Date(cartBookableDate.date),
            cartBookableDate: cartBookableDate,
        } as StaffDate
    }

    const addStaffDates = useRecoilCallback(
        ({ set }) =>
            (cartBookableDates: CartBookableDate[]) => {
                const dates = cartBookableDates.map((x) =>
                    cartBookableDateToStaffDate(x)
                )

                const yearArrays = dates.map((x) => x.date.getFullYear())
                const years = [...new Set(yearArrays)]

                years.forEach((year) => {
                    const monthArrays = dates
                        .filter((x) => x.date.getUTCFullYear() === year)
                        .map((x) => x.date.getUTCMonth())
                    const months = [...new Set(monthArrays)]
                    months.forEach((month) => {
                        const monthDates = dates.filter(
                            (x) =>
                                x.date.getUTCMonth() === month &&
                                x.date.getUTCFullYear() === year
                        )
                        set(staffDatesState, (prevItems) => {
                            const prevMonthDates =
                                prevItems.find(
                                    (x) => x.year === year && x.month === month
                                )?.dates ?? []
                            const items = prevItems.filter(
                                (x) => !(x.year === year && x.month === month)
                            )
                            //remove possible duplicates
                            const dates = [
                                ...new Map(
                                    monthDates
                                        .concat(prevMonthDates)
                                        .map((item) => [
                                            item.date.getDate(),
                                            item,
                                        ])
                                ).values(),
                            ]
                            return items.concat([
                                {
                                    month: month,
                                    dates: dates,
                                    year: year,
                                },
                            ])
                        })
                    })
                })
            },
        []
    )

    const getRangeDate = (date: Date, locationTz: string) => {
        return formatDateFns(date, locationTz, 'yyyy-MM-dd')
    }

    const loadStaffDatesForMonth = async (
        year: number,
        month: number,
        cart: Cart,
        locationTz: string
    ): Promise<CartBookableDate[]> => {
        const staffDatesStore = getStaffDateState()
        //check do we need to get passed month or not
        if (
            staffDatesStore &&
            staffDatesStore?.filter((x) => x.year === year && x.month === month)
                .length > 0
        ) {
            return []
        }

        try {
            const minimumDate = getMinimumDate(locationTz)
            const monthStart = new Date(year, month, 1)
            const lowerRangeDate = isAfter(minimumDate, monthStart)
                ? minimumDate
                : monthStart
            const dates = await cart.getBookableDates({
                searchRangeLower: getRangeDate(lowerRangeDate, locationTz),
                searchRangeUpper: getRangeDate(
                    new Date(year, month + 1, 0),
                    locationTz
                ),
                timezone: locationTz,
            })
            if (dates === undefined) {
                return []
            }
            addStaffDates(dates)
            return dates
        } catch (e) {
            console.error(e)
        }
        return []
    }

    const loadStaffDates = async (
        year: number,
        month: number,
        cart: Cart | undefined,
        locationTz: string
    ): Promise<CartBookableDate[]> => {
        if (!cart) {
            return []
        }
        let date1 = new Date(year, month, 1)
        let date2 = new Date(date1.getFullYear(), date1.getMonth() + 1, 1)
        return (
            await Promise.all([
                loadStaffDatesForMonth(
                    date1.getFullYear(),
                    date1.getMonth(),
                    cart,
                    locationTz
                ),
                loadStaffDatesForMonth(
                    date2.getFullYear(),
                    date2.getMonth(),
                    cart,
                    locationTz
                ),
            ])
        ).flatMap((x) => x)
    }

    const getMinimumDate = (locationTz: string) => {
        const availabilityExcludedHours = 0
        return utcToZonedTime(
            addHours(new Date(), availabilityExcludedHours),
            locationTz
        )
    }

    const getFirstAvailableDayAfterTheDate = async (
        cart: Cart | undefined,
        locationTz: string,
        minimumDate: Date
    ): Promise<CartBookableDate | undefined> => {
        if (!cart) {
            return undefined
        }
        try {
            const dates = await cart.getBookableDates({
                searchRangeLower: getRangeDate(minimumDate, locationTz),
                timezone: locationTz,
                limit: 1,
            })
            if (dates === undefined || dates.length === 0) {
                return undefined
            }
            return dates[0]
        } catch (e) {
            return undefined
        }
    }

    const getFirstAvailableDay = async (
        cart: Cart | undefined,
        locationTz: string
    ): Promise<CartBookableDate | undefined> => {
        return getFirstAvailableDayAfterTheDate(
            cart,
            locationTz,
            getMinimumDate(locationTz)
        )
    }

    const getStaffDateState = useRecoilCallback(
        ({ snapshot }) =>
            () => {
                let loadable = snapshot.getLoadable(staffDatesState)
                return loadable.valueMaybe()
            },
        []
    )

    return {
        getFirstAvailableDay: getFirstAvailableDay,
        getFirstAvailableDayAfterTheDate: getFirstAvailableDayAfterTheDate,
        loadStaffDates: loadStaffDates,
        getStaffDateState: getStaffDateState,
        getMinimumDate: getMinimumDate,
        cartBookableDateToStaffDate: cartBookableDateToStaffDate,
    }
}

export const useSelectedStaffDateState = () =>
    useRecoilValue(selectedStaffDateState)
export const useSetSelectedStaffDateState = () =>
    useSetRecoilState(selectedStaffDateState)
