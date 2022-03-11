import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { colors } from 'constants/colors'

export const useStyles = makeStyles((theme: Theme) => ({
    topBlock: {
        height: '100%',
        paddingLeft: theme.spacing(2),
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: theme.spacing(2),
        cursor: 'pointer',
    },
    cart: {
        marginRight: '37px',
        cursor: 'pointer',
    },
    settings: {
        marginLeft: 'auto',
        marginRight: '37px',
        cursor: 'pointer',
        color: 'black'
    },
    round: {
        backgroundColor: colors.primary.main,
        backgroundSize: '100%',
        borderRadius: '50%',
        display: 'inline-block',
        height: '12px',
        width: '12px',
        lineHeight: '12px',
        fontSize: '10px',
        fontWeight: 700,
        position: 'relative',
        top: '8px',
        left: '-8px',
        textAlign: 'center',
    },
    popperArrow: {
        position: "relative",
        marginTop: "10px",
        width: '354px',
        "&::before": {
            backgroundColor: "white",
            content: '""',
            display: "block",
            position: "absolute",
            width: 12,
            height: 12,
            top: '-6px',
            transform: "rotate(45deg)",
            left: "calc(50% + 127px)",
            borderTop: '1px solid #C4C4C4',
            borderLeft: '1px solid #C4C4C4',
        }
    },
    popperContent: {
        padding: theme.spacing(2),
        backgroundColor: "white",
        border: '1px solid #C4C4C4',
        borderRadius: '4px',
        width: '354px'
    },
    boxWrapperCommon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dashLine: {
        borderTop: '1px dashed #C4C4C4',
        marginTop: '16px',
        paddingBottom: '24px',
        marginLeft: '-24px',
        marginRight: '-24px'
    },
    radioGroup: {
        width: '200px'
    }
}))
