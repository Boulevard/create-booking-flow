import { Box } from '@mui/material'
import { appExternalUrl } from 'lib/utils/locationUtils'
import { useStyles } from 'components/molecules/Header/useStyles'
const projectLogo = '/images/project_logo.png'

export const Logo = () => {
    const classes = useStyles()
    const redirectToInitialPage = () => {
        location.href = appExternalUrl
    }

    return (
        <Box
            className={classes.logo}
            onClick={redirectToInitialPage}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={projectLogo}
                alt="projectLogo"
                width={139}
                height={19}
            />
        </Box>

    )
}
