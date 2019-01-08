
export const parseRecords = records =>
    records.map(({ date, name, ...values }) => ({
        ...values,
        name,
        dateStr: date,
        date: new Date(date),
        key: `${name}@${date}`,
    }))
