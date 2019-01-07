
export const sortRecords = (records) => {
    const copy = records.slice(0)
    copy.sort((a, b) => b.date - a.date)
    return copy
}
