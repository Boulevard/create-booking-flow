export const getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone'
    }

    if (/android/i.test(userAgent)) {
        return 'Android'
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'iOS'
    }

    return 'unknown'
}
