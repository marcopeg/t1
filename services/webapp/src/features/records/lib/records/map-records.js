
export const mapRecords = items =>
    items.reduce((acc, curr) => ({ ...acc, [curr.key]: curr }), {})
