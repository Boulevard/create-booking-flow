import { makeStyles } from '@mui/styles'

export const useMapStoreInfoWindowStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        bottom: '30px',
        left: '-130px',
        width: '260px',
        fontSize: '14px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
    },
    popup: {
        backgroundColor: 'white',
        filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.15))',
        boxShadow: '0 1px 2px rgb(0 0 0 / 10%)',
        padding: '16px',
        fontSize: '14px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
    },
    bottomArrow: {
        borderLeftWidth: '20px!important',
        borderRightWidth: '20px!important',
        borderTopWidth: '20px!important',
        alignSelf: 'center',
        borderBottom: 'none',
        borderTopColor: '#fff!important',
        width: 0,
        height: 0,
        border: '10px solid transparent',
        zIndex: 101,
    },
}))
