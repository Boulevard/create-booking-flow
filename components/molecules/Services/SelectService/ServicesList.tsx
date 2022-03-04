import { useSelectedCartAvailableCategory } from 'lib/state/services'
import { CartAvailableBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Service } from 'components/molecules/Services/SelectService/Service'
import { Box } from '@mui/material'
import { useServicesListStyles } from 'components/molecules/Services/SelectService/useStyles'
import { BackHeader } from 'components/atoms/layout/mobile/BackHeader'
import { useMobile } from 'lib/utils/useMobile'
import { useContext } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

interface Props {
    searchString: string
}

export const ServicesList = ({ searchString }: Props) => {
    const classes = useServicesListStyles()
    const { isMobile } = useMobile()
    const layout = useContext(LayoutContext)
    const selectedCartAvailableCategory = useSelectedCartAvailableCategory()
    const cartAvailableBookableItemList =
        selectedCartAvailableCategory?.availableItems
            ?.filter(
                (x) =>
                    x.name.toLowerCase().indexOf(searchString.toLowerCase()) !==
                    -1
            )
            ?.map((x) => x as CartAvailableBookableItem)
    const onBackHeaderClick = () => {
        layout.setHideLeftPanel(false)
        layout.setHideRightPanel(true)
    }

    return (
        <>
            {isMobile && (
                <BackHeader
                    caption={selectedCartAvailableCategory?.name}
                    onClick={onBackHeaderClick}
                />
            )}
            <Box className={classes.root}>
                {cartAvailableBookableItemList?.map(
                    (cartAvailableBookableItem) => (
                        <Service
                            key={cartAvailableBookableItem.id}
                            bookableItem={cartAvailableBookableItem}
                        />
                    )
                )}
            </Box>
        </>
    )
}
