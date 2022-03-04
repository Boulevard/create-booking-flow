export const getFieldValueOrUndefined = (value: string | undefined) => {
    let result: string | undefined
    if (value?.length && value.length > 0) {
        result = value
    }
    return result
}
