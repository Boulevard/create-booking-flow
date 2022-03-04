import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { Box } from '@mui/material'
import { SelectedOption } from 'components/molecules/Services/SelectedServices/SelectedOption'

interface Props {
    bookableItem: CartBookableItem
    isReadMode?: boolean
}

export const SelectedOptions = ({ bookableItem, isReadMode }: Props) => {
    return (
        <>
            {bookableItem.selectedOptions && bookableItem.selectedOptions.length !== 0 && (
                <Box>
                    {bookableItem.selectedOptions.map((selectedOption) => (
                        <SelectedOption
                            key={selectedOption.id}
                            bookableItem={bookableItem}
                            option={selectedOption}
                            isReadMode={isReadMode}
                        />
                    ))}
                </Box>
            )}
        </>
    )
}
