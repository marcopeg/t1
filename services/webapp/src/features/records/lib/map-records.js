
export const mapRecords = (records) =>
    records.reduce((acc, curr) => ({ ...acc, [curr.key]: curr }), {})
