
export const initialState = {
    records: {}, // { id: { ... }, id1: { ...}, ... }
    required: [
        'temperature',
        'mood',
        'foo',
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
