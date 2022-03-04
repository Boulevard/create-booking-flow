import { makeStyles } from '@mui/styles'
import { colors } from 'constants/colors'

export const useServicesListStyles = makeStyles(() => ({
    root: {
        overflowY: 'scroll',
        position: 'sticky',
        height: '100%',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}))

export const useCategoriesListStyles = makeStyles(() => ({
    root: {
        overflowY: 'scroll',
        position: 'sticky',
        height: 'calc(100% - 113px)',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}))

export const useSelectServiceScreenStyles = makeStyles(() => ({
    screenWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    listWrapper: {
        height: 'calc(100% - 55px)',
    },
    topWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: '9px',
    },
    rightColumn: {
        paddingTop: '84.3px',
        paddingRight: '48px',
        width: '350px',
    },
    summaryWrapper: {
        position: 'fixed',
        top: '155px',
        right: '14px',
    },
}))

export const useServiceStyles = makeStyles(() => ({
    cardItemPrice: {
        display: 'inline-block',
        textTransform: 'lowercase',
        fontSize: '14px',
        fontWeight: 'bold',
        '&:first-letter': {
            textTransform: 'uppercase',
        },
    },

    cardItemDescBlock: {
        paddingTop: '14px',
        marginBottom: '20px',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
    },
}))

export const useCategoryStyles = makeStyles(() => ({
    cardItemName: {
        textTransform: 'uppercase',
    },

    cardItemNameSelected: {
        fontWeight: 'bold',
    },
}))

export const useServiceSearchStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: 'none',
        border: 'none',
    },
    inputWrapper: {
        width: 'calc(100% - 56px)',
        boxShadow: 'none',
        border: `1px solid ${colors.custom.lightGray}`,
        display: 'flex',
        justifyContent: 'space-between',
    },
    inputSearch: {
        padding: '2px 4px',
        boxShadow: 'none',
        height: 38,
        marginLeft: 16,
        flex: '1 0 1px',
        marginRight: 16,
    },
}))
