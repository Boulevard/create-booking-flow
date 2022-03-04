export class Logger {
    private readonly enabled: boolean
    constructor(enabled: boolean) {
        this.enabled = enabled
    }

    log(message?: any) {
        if (!this.enabled) {
            return
        }

        console.log(message)
    }

    error(message?: any) {
        if (!this.enabled) {
            return
        }

        console.error(message)
    }
}
