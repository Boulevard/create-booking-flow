import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { SummaryItem } from 'components/atoms/layout/summary/SummaryItem'
import { MapPin } from 'components/icons'
import { Step } from 'lib/state/booking-flow/types'
import React from 'react'
import { useCartBookableItemListStaff } from 'lib/state/staff'
import { Box } from '@mui/material'
import { DatePickerIcon } from 'components/icons/DatePickerIcon'

interface Props {
    bookableItem: CartBookableItem
}

export const Service = ({ bookableItem }: Props) => {
    const cartBookableItemListStaff = useCartBookableItemListStaff()
    const staff = cartBookableItemListStaff?.find(
        (s) => s.cartBookableItemId === bookableItem.id
    )?.staff

    const staffName = staff ? `with ${staff.name}` : 'with first available'
    const text = `${bookableItem.item.name} ${staffName}`
    return (
        <SummaryItem
            key={bookableItem.id}
            icon={<DatePickerIcon />}
            isEditable={true}
            step={Step.SelectedServices}
            textHtml={
                <Box
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    {text}
                </Box>
            }
        />
    )
}
