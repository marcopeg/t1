

export const parseFields = fields =>
    fields.map((field, idx) => ({
        type: String(field.type),
        name: String(field.name),
        label: field.label ? String(field.label) : null,
        group: field.group ? String(field.group) : 'other',
        isRequired: Boolean(field.isRequired),
        validate: field.validate || [],
        options: Object(field.options || {}),
        order: Number(field.order || idx),
    }))
