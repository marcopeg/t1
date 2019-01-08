/* eslint quote-props:off, comma-dangle:off */

// list of records as tracked by a specific user
export const r1 = [
    {
        "name": "temperature",
        "date": "2018-12-22",
        "value": 36.8,
        "meta": {}
    },
    {
        "name": "mood",
        "date": "2018-12-22",
        "value": "🌹",
        "meta": {}
    },
    {
        "name": "temperature",
        "date": "2018-12-20",
        "value": 36.8,
        "meta": {}
    },
    {
        "name": "temperature",
        "date": "2018-12-21",
        "value": 36.8,
        "meta": {}
    },
    {
        "name": "temperature",
        "date": "2018-12-23",
        "value": 37,
        "meta": {}
    },
    {
        "name": "mood",
        "date": "2018-12-23",
        "value": "🌹",
        "meta": {}
    },
    {
        "name": "temperature",
        "date": "2018-12-24",
        "value": 37.2,
        "meta": {
            "foo": 123
        }
    },
    {
        "name": "mood",
        "date": "2018-12-24",
        "value": "🌹",
        "meta": {}
    }
]

// FIELDS DEFINITION
// fields definitions as configured for a specific user
// - label:        an optional text, by default "fields.${name}" is used
//                   to render the lable within a language definition,
//                  falling back on the field name itself.
// - isRequired:    if "true" each field will apply a custom rule to
//                  perform the validation.
// - validate:      an optional list of validation rules.
//                  (might be extended with custom messages)
// - group:         optional, some sort of tab/grouping system in the UI.
//                  the value "main" will be open by default.
//                  if not specified, it will be grouped under "others".
// - options:       JSON, free data for the field type to render properly
export const f1 = [
    {
        "type": "temperature",
        "name": "bbt",
        "isRequired": true,
        "validate": [
            {
                rule: "float",
            },
        ],
        "group": "main",
        "options": {},
    },
    {
        "type": "select",
        "name": "mood",
        "label": "How do you feel today?",
        "isRequired": true,
        "group": "main",
        "options": {
            "values": [
                {
                    "label": "💚",
                    "value": 1,
                },
                {
                    "label": "💛",
                    "value": 0,
                },
                {
                    "label": "❤️",
                    "value": -1,
                },
            ]
        },
    },
    {
        "type": "select",
        "name": "food",
        "label": "How did you eat yesterday?",
        "isRequired": true,
        "group": "food",
        "options": {
            "values": [
                {
                    "label": "Light",
                    "value": -1,
                },
                {
                    "label": "Normal",
                    "value": 0,
                },
                {
                    "label": "Heavy",
                    "value": 1,
                },
            ]
        },
    },
    {
        "type": "text",
        "name": "notes"
    }
]


// GROUPS DEFINITION
// - label:         optional, falls back on a translated string "group.${name}"
// - isOpen:        optional, if truty the UI will make the group open/visible
//
// NOTE: groups "main" and "other" are filled in automatically
export const g1 = [
    {
        "name": "food",
        "isOpen": true,
    },
    {
        "name": "personal",
        "label": "About your food habits:",
    }
]
