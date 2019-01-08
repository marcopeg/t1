
export const mapFields = items =>
    items.reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {})
