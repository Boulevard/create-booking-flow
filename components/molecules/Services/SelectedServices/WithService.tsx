import { LayoutListItem } from 'components/atoms/layout/LayoutListItem'
import { Box } from '@mui/material'
import { ServiceStaff } from 'components/molecules/Services/SelectedServices/ServiceStaff'
import { SelectedOptions } from 'components/molecules/Services/SelectedServices/SelectedOptions'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { useServiceStyles } from 'components/molecules/Services/SelectedServices/useStyles'
import { ServicePrice } from 'components/atoms/layout/service/ServicePrice'
import { ServiceCartBookableItemCaption } from 'components/atoms/layout/service/ServiceCartBookableItemCaption'
import { ReactNode } from 'react'

interface Props {
    bookableItem: CartBookableItem
    handleChange?: () => void
    selected?: boolean
    children?: ReactNode
    isReadMode?: boolean
    hideBorderBottom?: boolean
    addRightArrow?: boolean
}

export const WithService = ({
    bookableItem,
    handleChange,
    selected,
    children,
    isReadMode,
    hideBorderBottom,
    addRightArrow,
}: Props) => {
    const classes = useServiceStyles()
    return (
        <LayoutListItem
            onClick={handleChange}
            selected={selected}
            useDefaultCursor={isReadMode}
            hideBorderBottom={hideBorderBottom}
            addRightArrow={addRightArrow}
            useBottomShadow={true}
        >
            <Box>
                <Box className={classes.summaryWrapper}>
                    <ServiceCartBookableItemCaption bookableItem={bookableItem} useBold={selected === true} />
                    <ServicePrice bookableItem={bookableItem.item} />
                </Box>
                <SelectedOptions
                    bookableItem={bookableItem}
                    isReadMode={isReadMode}
                />
                <ServiceStaff bookableItem={bookableItem} />
                {children}
            </Box>
        </LayoutListItem>
    )
}
