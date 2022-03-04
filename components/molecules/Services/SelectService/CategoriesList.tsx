import { Box } from '@mui/material'
import { useCategoriesListStyles } from 'components/molecules/Services/SelectService/useStyles'
import { Category } from 'components/molecules/Services/SelectService/Category'
import { CartAvailableCategory } from '@boulevard/blvd-book-sdk/lib/cart'

interface Props {
    availableCategories: CartAvailableCategory[]
}
export const CategoriesList = ({ availableCategories }: Props) => {
    const classes = useCategoriesListStyles()
    return (
        <Box className={classes.root}>
            {availableCategories?.map((availableCategory) => (
                <Category
                    key={availableCategory.id}
                    category={availableCategory}
                />
            ))}
        </Box>
    )
}
