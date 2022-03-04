import { CartAvailableBookableItemOption } from '@boulevard/blvd-book-sdk/lib/carts/items'
import { SelectableListItem } from 'components/atoms/layout/selectable-list-item/SelectableListItem'
import { Caption } from 'components/atoms/layout/selectable-list-item/Caption'
import { Price } from 'components/atoms/layout/selectable-list-item/Price'
import { useOption } from 'components/molecules/Services/SelectOptions/useStyles'
import { PriceLabel } from 'lib/utils/formatCurrency'
import { getDurationTextFromNumber } from 'lib/utils/durationUtils'
import { CartBookableItem } from '@boulevard/blvd-book-sdk/lib/cart'
import { useCartMethods, useCartState } from 'lib/state/cart'
import { useSetActiveSelectedService } from 'lib/state/services'
import React from 'react'
import { SelectedButton } from 'components/molecules/Services/SelectOptions/SelectedButton'

interface Props {
    option: CartAvailableBookableItemOption
    bookableItem: CartBookableItem | undefined
}
export const Option = ({ option, bookableItem }: Props) => {
    const classes = useOption()
    const cart = useCartState()
    const { addAddon, removeAddon } = useCartMethods()
    const setActiveSelectedService = useSetActiveSelectedService()
    const addOption = async () => {
        if (!cart || !bookableItem) {
            return
        }

        const cartServices = await addAddon(cart, bookableItem, option)
        setActiveSelectedService(
            cartServices.services.find((x) => x.id === bookableItem.id)
        )
    }
    const removeOption = async () => {
        if (!cart || !bookableItem) {
            return
        }

        const cartServices = await removeAddon(cart, bookableItem, option)
        setActiveSelectedService(
            cartServices.services.find((x) => x.id === bookableItem.id)
        )
    }

    const selected = bookableItem?.selectedOptions?.find(
        (x) => x.id === option.id
    )

    return (
        <SelectableListItem
            captionComponent={
                <Caption
                    name={option.name}
                    durationText={getDurationTextFromNumber(
                        option.durationDelta
                    )}
                />
            }
            priceComponent={
                <Price
                    classesCardItemPrice={classes.cardItemPrice}
                    priceStr={PriceLabel(option.priceDelta)}
                />
            }
            onSelectClick={addOption}
            btnName="Select"
            btnWidth={80}
            description={option.description}
            buttonComponent={
                selected && <SelectedButton removeOption={removeOption} />
            }
        />
    )
}
