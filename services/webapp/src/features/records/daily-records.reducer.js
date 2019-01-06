
export const initialState = {
    records: {}, // { id: { ... }, id1: { ...}, ... }

    // at one point this should become shomehow dynamic.
    // the user should be able to set up her own page.
    fields: [
        {
            name: 'temperature',
            type: 'temperature',
            label: 'Temperature',
            isRequired: true,
            defaultValue: 37,
        }, {
            name: 'mood',
            type: 'options',
            label: 'What is your mood?',
            isRequired: false,
            options: [
                {
                    name: 'good',
                    value: 'green',
                },
                {
                    name: 'meh',
                    value: 'yellow',
                },
                {
                    name: 'bad',
                    value: 'red',
                },
            ],
        },
    ],
}

/**
 * Actions
 */

export const ADD_RECORDS = 'addRecords@records'

// records: { id: { ... }, id1: { ...}, ... }
export const addRecords = records => ({
    type: ADD_RECORDS,
    payload: {
        records,
    },
})


/**
 * Handlers
 */

export const actionHandlers = {
    '@reset': () => ({ ...initialState }),
    [ADD_RECORDS]: (state, { payload }) => ({
        ...state,
        records: {
            ...state.records,
            ...payload.records,
        },
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
