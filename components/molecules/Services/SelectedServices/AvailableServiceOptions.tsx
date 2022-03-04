import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Box } from '@mui/material'
import { AvailableServiceOption } from 'components/molecules/Services/SelectedServices/AvailableServiceOption'
import { useAvailableServiceOptionsStyles } from 'components/molecules/Services/SelectedServices/useStyles'

interface Props {
    bookableItem: CartBookableItem
}

export const AvailableServiceOptions = ({ bookableItem }: Props) => {
    const classes = useAvailableServiceOptionsStyles()

    if (!bookableItem.item.optionGroups) {
        return <></>
    }
    const additionalOptions = bookableItem.item.optionGroups.length
        ? bookableItem.item.optionGroups[0].options
        : undefined
    const addedAdditionalOptions = bookableItem.selectedOptions
        .map((selectedOption) => selectedOption.id)
        .sort()
        .join(',')
    const allExistingAdditionalOptions = additionalOptions
        ?.map((additionalOption) => additionalOption.id)
        .sort()
        .join(',')
    const areAllAdditionalOptionsAdded =
        addedAdditionalOptions === allExistingAdditionalOptions
    return (
        <>
            {!areAllAdditionalOptionsAdded && additionalOptions && (
                <Box>
                    <Box
                        component="span"
                        className={classes.customizeYourService}
                    >
                        Customize your service
                    </Box>
                    {additionalOptions.map((option) => (
                        <AvailableServiceOption
                            key={option.id}
                            option={option}
                            bookableItem={bookableItem}
                        />
                    ))}
                </Box>
            )}
        </>
    )
}
