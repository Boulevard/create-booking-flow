import { useErrorMessage } from 'lib/state/error'
import { ErrorType } from 'lib/state/error/enums'
import React, { useContext, useEffect } from 'react'
import { LayoutContext } from 'components/atoms/layout/LayoutContext'

export const ServerError = () => {
    const errorMessage = useErrorMessage()
    const layout = useContext(LayoutContext)
    useEffect(() => {
        layout.setIsBlurScreen(errorMessage !== ErrorType.NoError)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage])
    return <>{errorMessage !== ErrorType.NoError && <ServerError />}</>
}
