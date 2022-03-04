import { Box, Button } from '@mui/material'
import React from 'react'
import { useStyles } from 'components/atoms/layout/selectable-list-item/useStyles'
import { useMobile } from 'lib/utils/useMobile'

interface Props {
    btnName: string
    btnWidth: number
    onSelectClick: () => void
    btnTop?: string
    sxWrapper?: any
    sxButton?: any
}

export const SelectableListBtn = ({
    btnName,
    onSelectClick,
    btnWidth,
    btnTop,
    sxWrapper,
    sxButton,
}: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    return (
        <Box className={classes.selectBtnWrapper} sx={sxWrapper}>
            <Button
                variant="contained"
                sx={{
                    width: btnWidth,
                    top: btnTop ?? isMobile ? '0px' : '17px',
                    marginTop: isMobile ? '5px!important' : '16px',
                    ...(sxButton ?? {}),
                }}
                className={classes.selectBtn}
                onClick={onSelectClick}
            >
                {btnName}
            </Button>
        </Box>
    )
}
