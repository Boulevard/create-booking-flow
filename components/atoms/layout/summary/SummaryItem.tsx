import { Box, Theme, Typography } from '@mui/material'
import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Step } from 'lib/state/booking-flow/types'
import { useFlowStep } from 'lib/state/booking-flow'
import { SummaryItemBase } from 'components/atoms/layout/summary/SummaryItemBase'

interface StylesProps {
    isIconExist: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoText: {
            paddingLeft: (props: StylesProps) =>
                props.isIconExist ? theme.spacing(1) : 0,
            paddingRight: theme.spacing(1),
            fontSize: 16,
            textTransform: 'capitalize',
        },
    })
)

interface Props {
    icon?: JSX.Element
    text?: string
    textHtml?: React.ReactNode
    step: Step
    isEditable: boolean
}

export const SummaryItem = ({
    icon,
    text,
    step,
    isEditable,
    textHtml,
}: Props) => {
    const isIconExist = !!icon
    const classes = useStyles({ isIconExist })

    return (
        <SummaryItemBase step={step} isEditable={isEditable}>
            {icon}
            <Typography className={classes.infoText} variant="body1">
                {text}
                {textHtml}
            </Typography>
        </SummaryItemBase>
    )
}
