
export const mapGroups = items =>
    items.reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {})
