import { CartAvailableCategory } from '@boulevard/blvd-book-sdk/lib/cart'
import { LayoutListItem } from 'components/atoms/layout/LayoutListItem'
import { Box } from '@mui/material'
import { useCategoryStyles } from 'components/molecules/Services/SelectService/useStyles'
import {
    useSelectedCartAvailableCategory,
    useSetSelectedCartAvailableCategory,
} from 'lib/state/services'
import clsx from 'clsx'
import { useMobile } from 'lib/utils/useMobile'
import { useContext } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

interface Props {
    category: CartAvailableCategory
}
export const Category = ({ category }: Props) => {
    const classes = useCategoryStyles()
    const { isMobile } = useMobile()
    const layout = useContext(LayoutContext)
    const setSelectedCartAvailableCategory =
        useSetSelectedCartAvailableCategory()
    const selectedCartAvailableCategory = useSelectedCartAvailableCategory()
    const onSelect = () => {
        setSelectedCartAvailableCategory(category)
        if (isMobile) {
            layout.setHideLeftPanel(true)
            layout.setHideRightPanel(false)
        }
    }
    const selected =
        selectedCartAvailableCategory?.id === category.id && !isMobile

    return (
        <LayoutListItem
            useBottomShadow={true}
            onClick={onSelect}
            selected={selected}
            addRightArrow={true}
        >
            <Box
                className={clsx(
                    classes.cardItemName,
                    (selected || isMobile) && classes.cardItemNameSelected
                )}
            >
                {category.name}
            </Box>
        </LayoutListItem>
    )
}
