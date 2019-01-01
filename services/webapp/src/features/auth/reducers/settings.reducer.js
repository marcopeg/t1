
export const initialState = {
    theme: 'white',
}

/**
 * Actions
 */


/**
 * Handlers
 */

export const actionHandlers = {
    '@reset': () => ({ ...initialState }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

