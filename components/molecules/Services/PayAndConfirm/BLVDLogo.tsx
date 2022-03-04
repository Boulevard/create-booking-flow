import { Typography, Box } from '@mui/material'
import { useMobile } from 'lib/utils/useMobile'
const blvdLogo = '/images/blvd_logo.png'

export const BLVDLogo = () => {
    const { isMobile } = useMobile()

    return (
        <Box
            sx={{
                width: !isMobile ? '200px' : '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: !isMobile ? 'flex-start': 'center',
                alignItems: 'center',
                '& img': {
                    width: '105px',
                    height: '15px',
                },
            }}
        >
            <Typography variant="h4" sx={{ pr: 1 }}>
                Powered by{' '}
            </Typography>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blvdLogo} alt="BOULEVARD" width={105} height={15} />
        </Box>
    )
}
