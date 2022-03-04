import { Box } from '@mui/material'

interface Props {
    priceStr: string
    classesCardItemPrice?: any
}

export const Price = ({ priceStr, classesCardItemPrice }: Props) => {
    return (
        <Box component="span" className={classesCardItemPrice}>
            {priceStr}
        </Box>
    )
}
