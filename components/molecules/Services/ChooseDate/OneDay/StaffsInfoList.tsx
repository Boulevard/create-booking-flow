import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Theme, Typography } from '@mui/material'
import { useCartBookableItemListStaff } from 'lib/state/staff'
import { useSelectedServices } from 'lib/state/services'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import clsx from 'clsx'
import { useCartMethods } from 'lib/state/cart'

const useStyles = makeStyles((theme: Theme) => ({
    staffInfoList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        display: 'inline-block',
        borderRadius: '50%',
        backgroundSize: '100%',
        marginRight: theme.spacing(2),
        marginTop: '5px',
        backgroundColor: theme.palette.primary.main + '4C',
        lineHeight: '40px',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyAvatar: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#FFFFFF',
    },
}))

export const StaffsInfoList = () => {
    const classes = useStyles()
    const { selectedServicesStateValue, reverseSelectedServices } =
        useSelectedServices()
    const reversedList = reverseSelectedServices(selectedServicesStateValue)
    const cartBookableItemListStaff = useCartBookableItemListStaff()
    const { isCartAvailableBookableItem } = useCartMethods()

    const getStaff = (bookableItemId: string) => {
        return cartBookableItemListStaff?.find(
            (s) => s.cartBookableItemId === bookableItemId
        )?.staff
    }

    return (
        <Box className={classes.staffInfoList}>
            {reversedList?.filter(x=>isCartAvailableBookableItem(x.item))
                .map((bookableItem: CartBookableItem) => (
                <Box key={bookableItem.id} className={classes.item}>
                    {getStaff(bookableItem.id)?.avatar ? (
                        <Box
                            className={classes.avatar}
                            sx={{
                                backgroundImage: `url(${
                                    getStaff(bookableItem.id)?.avatar
                                })`,
                            }}
                        />
                    ) : (
                        <Box
                            className={clsx(
                                classes.avatar,
                                classes.emptyAvatar
                            )}
                        >
                            N
                        </Box>
                    )}

                    <Box>
                        <Typography variant="h4">
                            {getStaff(bookableItem.id)?.name}
                        </Typography>
                        <Typography>{bookableItem.item.name}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}
