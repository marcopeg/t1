
export const getDaysList = (records) => {
    const list = records.reduce((acc, curr) => (
        acc.indexOf(curr.dateStr) === -1
            ? [ ...acc, curr.dateStr ]
            : acc
    ), [])

    list.sort()
    list.reverse()

    return list
}
