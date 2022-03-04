import { Box, Theme, Typography } from '@mui/material'
import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { useMobile } from 'lib/utils/useMobile'
import { useIsSummaryBlockOpenState } from 'lib/state/summary'
interface StylesProps {
    isMobile: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoBlock: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.custom.lightGray}`,
            margin: (props: StylesProps) => (!props.isMobile ? 0 : theme.spacing(0, -3)),
            paddingRight: (props: StylesProps) => (!props.isMobile ? theme.spacing(3) : 0),
            '&:first-child': {
                height: (props: StylesProps) => (!props.isMobile ? '57px' : 'auto'),
                borderBottom: (props: StylesProps) => (!props.isMobile ? '1px solid #C4C4C4' : `1px solid ${theme.palette.custom.lightGray}`),
                boxShadow: (props: StylesProps) => (!props.isMobile ? '0px 1px 2px rgba(0, 0, 0, 0.25)' : 'none'),
            },
        },
        editButton: {
            paddingRight: (props: StylesProps) => (!props.isMobile ? 0 : theme.spacing(3)),
            cursor: 'pointer',
            marginLeft: 'auto',
        },
    })
)

interface Props {
    children?: React.ReactNode
    step?: Step
    isEditable: boolean
    padding?: string
    onEdit?: () => void
}

export const SummaryItemBase = ({
    children,
    step,
    isEditable,
    padding,
    onEdit,
}: Props) => {
    const { isMobile } = useMobile()
    const classes = useStyles({ isMobile })
    const { setStep } = useFlowStep()
    const [isSummaryBlockOpen, setIsSummaryBlockOpen] =
        useIsSummaryBlockOpenState()

    const onEditClick = async () => {
        if (isSummaryBlockOpen) {
            setIsSummaryBlockOpen(false)
        }
        if (onEdit) {
            onEdit()
        }
        if (step) {
            await setStep(step)
        }
    }

    return (
        <Box
            className={classes.infoBlock}
            sx={{
                padding: padding ?? 2,
                paddingRight: !isMobile ? 0 : 2,
            }}
        >
            {children}
            {isEditable && (
                <Typography
                    className={classes.editButton}
                    variant="subtitle2"
                    onClick={onEditClick}
                >
                    Edit
                </Typography>
            )}
        </Box>
    )
}
