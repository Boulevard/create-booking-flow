import queryString from 'query-string'
import { useRouter } from 'next/router'

export interface UrlParams {
    ref: string
    storeId: string
    shopperId: string
}

export const useUrlParams = () => {
    const router = useRouter()

    const getUrlParams = (): UrlParams => {
        const parsedUrl = queryString.parseUrl(
            `https://anydomain.com${router.asPath}`,
            { parseFragmentIdentifier: true }
        )
        const { ref, storeId, shopperId } = parsedUrl.query
        return { ref, storeId, shopperId } as UrlParams
    }

    return {
        getUrlParams: getUrlParams,
    }
}
