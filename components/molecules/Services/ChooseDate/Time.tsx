import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { StaffTime } from 'lib/state/staffTime/types'
import formatDateFns, { TimeFormat } from 'lib/utils/formatDateFns'
import { Store } from 'lib/state/store/types'
import { useSetSelectedStaffTimeState } from 'lib/state/staffTime'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

const useStyles = makeStyles(() => ({
    selectTimeBtn: {
        width: 68,
        height: 32,
        fontWeight: 500,
        textTransform: 'lowercase',
    },
}))

interface Props {
    time: StaffTime
    store: Store | undefined
}

export const Time = ({ time, store }: Props) => {
    const classes = useStyles()
    const setSelectedStaffTimeState = useSetSelectedStaffTimeState()
    const layout = useContext(LayoutContext)

    const onSelectTime = async () => {
        setSelectedStaffTimeState(time)
        layout.setShowBottom(true)
    }

    return (
        <Button
            key={'time' + time.cartBookableTime?.id}
            variant="contained"
            className={classes.selectTimeBtn}
            sx={{
                mr: 1,
                mb: 1,
            }}
            onClick={onSelectTime}
        >
            {formatDateFns(time.locationTime, store?.location.tz, TimeFormat)}
        </Button>
    )
}
