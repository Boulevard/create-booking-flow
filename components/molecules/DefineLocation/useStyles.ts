import { makeStyles } from '@mui/styles'
import { colors } from 'constants/colors'

interface StylesProps {
    isMobile: boolean
}

export const useStyles = makeStyles(() => ({
    resultList: {
        backgroundColor: 'white',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'absolute',
        zIndex: 100,
        border: '1px solid #E3E3E3',
    },
    resultItem: {
        cursor: 'pointer',
        padding: '11px 10px',
        borderBottom: '0.5px solid #E3E3E3',
        '&:hover': {
            backgroundColor: 'antiquewhite',
        },
    },
    resultItemHover: {
        backgroundColor: 'antiquewhite',
    },
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
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    inputSearch: (props: StylesProps) => ({
        padding: '2px 4px',
        boxShadow: 'none',
        height: 38,
        marginLeft: 16,
        flex: '1 0 1px',
        marginRight: 16,
    }),
}))
