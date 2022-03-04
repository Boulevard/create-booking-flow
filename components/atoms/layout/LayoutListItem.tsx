import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useMobile } from 'lib/utils/useMobile'
import { SxProps } from '@mui/system'
import { MouseEventHandler } from 'react'
import { ArrowRight } from 'components/icons/ArrowRight'
import { colors } from 'constants/colors'

interface StylesProps {
    isMobile: boolean
    selected: boolean | undefined
    useDefaultCursor?: boolean
    hideBorderBottom?: boolean
    useBottomShadow?: boolean
}

interface Props {
    children: any
    sx?: SxProps<Theme>
    onClick?: MouseEventHandler | undefined
    id?: string | undefined
    selected?: boolean | undefined
    useDefaultCursor?: boolean
    hideBorderBottom?: boolean
    useBottomShadow?: boolean
    addRightArrow?: boolean
}

const leftShadow = '4px 0 0 0'
const bottomShadow = '0 -3px 0 0'

const useStyles = makeStyles((theme: Theme) => ({
    block: {
        padding: (props: StylesProps) => (!props.isMobile ? theme.spacing(3, 2) : theme.spacing(3)),
        cursor: (props: StylesProps) =>
            props.useDefaultCursor ? 'default' : 'pointer',

        boxShadow: (props: StylesProps) =>
            props.selected
                ? `inset ${props.useBottomShadow ? bottomShadow : leftShadow} ${
                      theme.palette.primary.main
                  }`
                : 'none',
        borderBottom: (props: StylesProps) =>
            props.hideBorderBottom
                ? ''
                : `1px solid ${theme.palette.custom.lightGray}`,
        '&:last-child': {
            marginBottom: theme.spacing(4),
        },
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    right: {
        marginLeft: 'auto',
    },
}))

export const LayoutListItem = ({
    id,
    children,
    sx,
    onClick,
    selected,
    useDefaultCursor,
    hideBorderBottom,
    useBottomShadow,
    addRightArrow,
}: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({
        isMobile,
        selected,
        useDefaultCursor,
        hideBorderBottom,
        useBottomShadow,
    })
    const arrowColor = selected ? colors.primary.main : 'black'
    return (
        <Box id={id} className={classes.block} sx={sx} onClick={onClick}>
            {addRightArrow && (
                <Box className={classes.row}>
                    {children}
                    <Box className={classes.right}>
                        <ArrowRight color={arrowColor} />
                    </Box>
                </Box>
            )}
            {!addRightArrow && <>{children}</>}
        </Box>
    )
}
