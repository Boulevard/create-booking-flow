export function roundNumber(num: number, decimalPlaces: number = 0) {
    const p = Math.pow(10, decimalPlaces)
    return Math.round((num + Number.EPSILON) * p) / p
}
