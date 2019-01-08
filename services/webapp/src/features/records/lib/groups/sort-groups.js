
export const sortGroups = (group) => {
    const copy = group.slice(0)
    copy.sort((a, b) => a.order - b.order)
    return copy
}
