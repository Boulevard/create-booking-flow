import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Logger } from 'lib/wrappers/logger'

export class IpWrapper {
    private readonly client: AxiosInstance
    private readonly baseUrl: string

    constructor(logger: Logger, baseUrl: string) {
        this.client = Axios.create()
        this.baseUrl = baseUrl
        this.client.interceptors.request.use((request) => {
            logger.log({
                data: request.data,
                url: request.url,
            })

            return request
        })
        this.client.interceptors.response.use(
            (response) => {
                // For unhandled promise rejection
                logger.log({
                    data: response,
                })

                return response
            },
            (error) => {
                // For unhandled promise rejection
                logger.error({
                    err: error,
                })

                return error
            }
        )
    }

    private getIpInternal() {
        return this.get(this.baseUrl, {})
    }

    async getIp() {
        try {
            const data = await this.get(this.baseUrl, {})
            return data.ip
        } catch {}

        return ''
    }

    private async get(url: string, data: any): Promise<any> {
        return (await this.client.post(url, data, IpWrapper.getConfig()))?.data
    }

    private static getConfig(accept = 'application/json'): AxiosRequestConfig {
        return {
            headers: {
                Accept: accept,
            },
        }
    }
}

const apiUrl = 'https://ipapi.co/json/'
export const ipWrapper = new IpWrapper(new Logger(false), apiUrl ?? '')
