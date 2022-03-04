import { makeStyles } from '@mui/styles'
import { colors } from 'constants/colors'
import { Colors } from 'enums/colors'

export const useSelectedServicesScreenStyles = makeStyles(() => ({
    servicesRoot: {
        paddingTop: '1px',
        paddingBottom: '1px',
        height: 'calc(100% - 93px)',
    },
}))

export const useAvailableServiceOptionsStyles = makeStyles(() => ({
    customizeYourService: {
        fontWeight: 500,
    },
}))

export const useStaffErrorStyles = makeStyles(() => ({
    staffError: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '20px',
    },
    staffErrorIconInline: {
        display: 'inline-block',
        border: '1px solid red',
        color: 'red',
        width: '25px',
        height: '25px',
        lineHeight: '25px',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        borderRadius: '50%',
        marginRight: '10px',
    },
}))

export const useServiceStaffStyles = makeStyles(() => ({
    staffSelected: {
        lineHeight: '25px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    staffAvatar: {
        backgroundSize: '100%',
        borderRadius: '50%',
        height: '32px',
        width: '32px',
        display: 'inline-block',
        marginRight: '10px',
    },
    chosenItemStaffBoxAvatarEmpty: {
        border: '1px solid #e3e3e3',
        backgroundSize: '100%',
        borderRadius: '50%',
        display: 'inline-block',
        lineHeight: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
}))

export const useAvailableServiceOptionStyles = makeStyles(() => ({
    optionRoot: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: '10px',
    },
    plus: {
        cursor: 'pointer',
        display: 'flex',
        paddingTop: '3px',
    },
    textWrapper: {
        paddingLeft: '8px',
    },
    description: {
        fontSize: '13px',
        color: '#737373',
    },
}))

export const useSelectedServicesStyles = makeStyles(() => ({
    root: {
        overflowY: 'scroll',
        position: 'sticky',
        height: 'calc(100% - 60px)',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}))

export const useServiceStyles = makeStyles(() => ({
    serviceNameText: {
        fontWeight: 700,
    },
    serviceExpanded: {
        margin: '15px 0px!important',
    },
    summaryWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    removeServiceWrapper: {
        borderTop: '1px #e3e3e3 solid',
        paddingTop: '12px',
        marginTop: '12px',
    },
    removeServiceText: {
        cursor: 'pointer',
        width: 'fit-content',
        color: colors.primary.main,
        '&:hover': {
            filter: 'brightness(1.2)',
            transform: 'scale(1) rotate(0.2deg)',
        },
    },
    removeBtn: {
        width: 125,
        height: 38,
        fontSize: '16px',
        fontWeight: 500,
        textTransform: 'capitalize',
        marginTop: '16px',
    },
}))

export const useSelectedOptionStyles = makeStyles(() => ({
    root: {
        paddingBottom: '2px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    remove: {
        cursor: 'pointer',
        display: 'flex',
        paddingLeft: '8px',
    },
}))

export const useMobileAddAnotherServiceStyles = makeStyles(() => ({
    leftPanelBottom: {
        height: '62px',
        display: 'flex',
        position: 'fixed',
        bottom: '56px',
        width: '100%',
        backgroundColor: 'white',
        paddingTop: '10px',
    },
    leftPanelBottomBtn: {
        fontSize: '16px',
        fontWeight: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))
