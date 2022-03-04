export const sortByDate = (a, b) =>
    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
export const sortByDistance = (a, b, selectedStore) =>
    a.location.id === selectedStore?.location?.id ? -1 : a.distance - b.distance
