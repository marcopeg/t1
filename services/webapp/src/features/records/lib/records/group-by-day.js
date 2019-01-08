
const fn = (acc, curr) => {
    const keyDay = curr.dateStr
    const keyRecord = curr.key

    if (acc[keyDay]) {
        acc[keyDay][keyRecord] = curr
    } else {
        acc[keyDay] = { [keyRecord]: curr }
    }

    return acc
}

export const groupByDay = (records) =>
    records.reduce(fn, {})
