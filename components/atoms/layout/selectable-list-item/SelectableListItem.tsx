import { LayoutListItem } from 'components/atoms/layout/LayoutListItem'
import { Box, Button } from '@mui/material'
import { useStyles } from 'components/atoms/layout/selectable-list-item/useStyles'
import React from 'react'
import { SelectableListBtn } from 'components/atoms/layout/selectable-list-item/SelectableListBtn'
import { useMobile } from 'lib/utils/useMobile'
import clsx from 'clsx'

interface Props {
    captionComponent: React.ReactNode
    priceComponent: React.ReactNode
    description?: string
    btnName: string
    btnWidth: number
    onSelectClick: () => void
    buttonComponent?: React.ReactNode
}

export const SelectableListItem = ({
    captionComponent,
    priceComponent,
    description,
    btnName,
    onSelectClick,
    btnWidth,
    buttonComponent,
}: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    return (
        <LayoutListItem
            useDefaultCursor={true}
            sx={{
                paddingTop: '19px!important',
                paddingBottom: '16px!important',
            }}
        >
            <Box
                className={clsx(
                    isMobile && classes.column,
                    !isMobile && classes.row
                )}
            >
                <Box
                    sx={{
                        marginRight: '20px',
                    }}
                >
                    {captionComponent}

                    <Box className={classes.cardItemDescBlock}>
                        <Box component="span">{description}</Box>
                    </Box>
                    {priceComponent}
                </Box>

                {buttonComponent}
                {!buttonComponent && (
                    <SelectableListBtn
                        btnWidth={btnWidth}
                        btnName={btnName}
                        onSelectClick={onSelectClick}
                    />
                )}
            </Box>
        </LayoutListItem>
    )
}
