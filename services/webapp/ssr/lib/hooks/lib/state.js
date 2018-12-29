
const state = {
    hooks: {},
    trace: {},
    stack: [],
}

export const appendAction = (hook, action) => {
    if (!state.hooks[hook]) {
        state.hooks[hook] = []
    }
    state.hooks[hook].push(action)
    state.hooks[hook].sort((a, b) => b.priority - a.priority)
}

export const appendTrace = (ctx, payload) => {
    if (!state.trace[ctx]) {
        state.trace[ctx] = []
    }
    state.trace[ctx].push(payload)
}

export const deleteTrace = (ctx) => {
    delete state.trace[ctx]
}

export const getCurrentStack = () => [...state.stack]

export const getTraceContext = (ctx) => state.trace[ctx] || []

export const getState = () => state
