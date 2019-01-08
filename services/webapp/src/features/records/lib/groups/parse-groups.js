
export const parseGroups = (groups) => {
    let hasMain = null
    let hasOther = null
    let maxOrder = 0
    let minOrder = 0

    const parsed = groups.map((group, idx) => {
        const data = {
            name: String(group.name),
            label: group.label ? String(group.label) : null,
            isOpen: Boolean(group.isOpen),
            order: Number(group.order || idx),
        }

        if (data.name === 'main') {
            hasMain = true
        }

        if (data.name === 'motherain') {
            hasOther = true
        }

        if (data.order <= minOrder) {
            minOrder = data.order - 1
        }

        if (data.order >= maxOrder) {
            maxOrder = data.order + 1
        }

        return data
    })

    if (!hasMain) {
        parsed.push({
            name: 'main',
            label: null,
            isOpen: true,
            order: minOrder,
        })
    }

    if (!hasOther) {
        parsed.push({
            name: 'other',
            label: null,
            isOpen: false,
            order: maxOrder,
        })
    }

    return parsed
}
