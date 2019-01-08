
export const sortFields = (field) => {
    const copy = field.slice(0)
    copy.sort((a, b) => a.order - b.order)
    return copy
}
