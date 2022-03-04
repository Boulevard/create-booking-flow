import {
    CartBookableItemStaff,
    Staff as StaffType,
} from 'lib/state/staff/types'
import { Box } from '@mui/material'
import { useStaffStyles } from 'components/molecules/Services/ChooseStaff/useStyles'
import clsx from 'clsx'
import {
    useCartBookableItemListStaff,
    useSetCartBookableItemListStaff,
} from 'lib/state/staff'
import {
    useActiveSelectedService,
    useSelectedServices,
} from 'lib/state/services'
import { useCartMethods, useCartState } from 'lib/state/cart'
import React, { useContext } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'
import { LayoutListItem } from 'components/atoms/layout/LayoutListItem'
import { SelectableListBtn } from 'components/atoms/layout/selectable-list-item/SelectableListBtn'
import { SelectedButton } from 'components/molecules/Services/ChooseStaff/SelectedButton'
import { useMobile } from 'lib/utils/useMobile'

interface Props {
    staff: StaffType
}
export const Staff = ({ staff }: Props) => {
    const { isMobile } = useMobile()
    const classes = useStaffStyles()
    const activeSelectedService = useActiveSelectedService()
    const setCartBookableItemListStaff = useSetCartBookableItemListStaff()
    const { selectStaff, isCartAvailableBookableItem } = useCartMethods()
    const cart = useCartState()
    const cartBookableItemListStaff = useCartBookableItemListStaff()
    const selectedStaff = cartBookableItemListStaff?.find(
        (s) => s.cartBookableItemId === activeSelectedService?.id
    )?.staff
    const layout = useContext(LayoutContext)
    const { selectedServicesStateValue } = useSelectedServices()

    const onSelectClick = async () => {
        const service = selectedServicesStateValue.find(
            (x) => x.id === activeSelectedService?.id
        )
        if (
            activeSelectedService === undefined ||
            cart === undefined ||
            service === undefined
        ) {
            return
        }
        let newCartBookableItemListStaff: CartBookableItemStaff[] | undefined
        setCartBookableItemListStaff((oldValue) => {
            newCartBookableItemListStaff = oldValue
                ? [
                      ...oldValue.filter(
                          (s) =>
                              s.cartBookableItemId !== activeSelectedService.id
                      ),
                  ]
                : []
            newCartBookableItemListStaff.push({
                cartBookableItemId: activeSelectedService.id,
                staff: staff,
            })

            return newCartBookableItemListStaff
        })
        const isAllStaffAssigned =
            selectedServicesStateValue
                .filter(x=>isCartAvailableBookableItem(x.item))
                .map((x) =>
                    newCartBookableItemListStaff?.find(
                        (s) => s.cartBookableItemId === x.id
                    )
                )
                .filter((x) => x === undefined).length === 0
        layout.setShowBottom(isAllStaffAssigned)
        layout.setShowLeftBottom(isAllStaffAssigned)
        await selectStaff(cart, service, staff)
    }

    const isSelectedStaffState = selectedStaff?.id === staff.id

    return (
        <LayoutListItem
            useDefaultCursor={true}
            sx={{
                paddingTop: '19px!important',
                paddingBottom: '16px!important',
                paddingLeft: '24px!important',
            }}
        >
            <Box className={classes.row}>
                {staff.avatar && (
                    <Box
                        className={clsx(classes.staffBoxAvatar)}
                        sx={{ backgroundImage: `url(${staff.avatar})` }}
                    />
                )}
                {!staff.avatar && !staff.id && (
                    <Box
                        className={clsx(
                            classes.staffBoxAvatar,
                            classes.staffBoxAvatarEmpty
                        )}
                    >
                        N
                    </Box>
                )}
                <Box className={classes.staffTextBlock}>
                    <Box
                        className={clsx(
                            classes.staffTextItem,
                            classes.staffName
                        )}
                    >
                        {staff.name}
                    </Box>
                    {staff.id && (
                        <Box className={classes.staffTextItem}>
                            {staff.name}
                        </Box>
                    )}
                </Box>

                {!isSelectedStaffState && (
                    <SelectableListBtn
                        btnWidth={78}
                        btnName="Select"
                        onSelectClick={onSelectClick}
                        btnTop={'0px'}
                        sxWrapper={{
                            marginLeft: isMobile ? 'auto!important' : undefined,
                            marginRight: isMobile
                                ? '16px!important'
                                : undefined,
                            display: isMobile ? 'flex' : undefined,
                            flexDirection: isMobile ? 'column' : undefined,
                        }}
                        sxButton={{
                            marginTop: isMobile ? 'auto!important' : undefined,
                            marginBottom: isMobile
                                ? 'auto!important'
                                : undefined,
                        }}
                    />
                )}
                {isSelectedStaffState && <SelectedButton />}
            </Box>
        </LayoutListItem>
    )
}
