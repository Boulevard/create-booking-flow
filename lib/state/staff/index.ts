import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { CartBookableItemStaff, Staff } from 'lib/state/staff/types'
import { CartAvailableBookableItemStaffVariant } from '@boulevard/blvd-book-sdk/lib/carts/items'

export const bookableStaffVariantsState = atom<Staff[]>({
    key: 'bookableStaffVariantsState',
    default: [],
})

export const cartBookableItemStaffListState = atom<
    CartBookableItemStaff[] | undefined
>({
    key: 'cartBookableItemStaffState',
    default: undefined,
})

export const allowChooseStaffErrorState = atom<boolean>({
    key: 'allowChooseStaffErrorState',
    default: false,
})

export const cartAvailableBookableItemStaffVariantToStaff = (
    z: CartAvailableBookableItemStaffVariant
): Staff => {
    return {
        id: z.staff.id,
        name: `${z.staff.firstName} ${z.staff.lastName}`,
        description: z.staff.bio,
        avatar: z.staff.avatar,
        staffVariant: z,
    } as Staff
}

export const useBookableStaffVariants = () =>
    useRecoilValue(bookableStaffVariantsState)
export const useSetBookableStaffVariants = () =>
    useSetRecoilState(bookableStaffVariantsState)

export const useCartBookableItemListStaff = () =>
    useRecoilValue(cartBookableItemStaffListState)
export const useSetCartBookableItemListStaff = () =>
    useSetRecoilState(cartBookableItemStaffListState)

export const useAllowChooseStaffError = () =>
    useRecoilValue(allowChooseStaffErrorState)
export const useSetAllowChooseStaffError = () =>
    useSetRecoilState(allowChooseStaffErrorState)
