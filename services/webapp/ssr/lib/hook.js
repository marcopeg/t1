
const hooks = {}

// wrap a single hook error and creates a rich error type
// that contains info regarding it's logical origin
const onItemError = (err, hookName, action) => {
    const message = err && err.message
        ? err.message
        : (typeof err === 'string' ? err : 'unknown error')
    const feature = action.meta && action.meta.name
        ? `${action.meta.name} - `
        : ' '
    const error = new Error(`[${hookName}] ${feature}${message}`)
    error.originalError = err
    error.action = action
    throw error
}

const defaultOptions = {
    async: false,
    args: null,
    onError: (err) => { throw err },
    onItemError,
}

export const registerHook = (name, fn, meta = {}) => {
    if (!hooks[name]) {
        hooks[name] = []
    }
    hooks[name].push({
        enabled: true,
        meta,
        fn,
    })
}

export const createHook = async (name, receivedOptions = {}) => {
    if (!hooks[name]) {
        console.log(`[hooks] "${name}" is empty`)
        return
    }

    const options = {
        ...defaultOptions,
        ...receivedOptions,
    }

    const actions = hooks[name]
        .filter(h => h.enabled === true)

    if (options.async === 'parallel') {
        try {
            return await Promise.all(actions.map(async (action) => {
                try {
                    return await action.fn(options.args)
                } catch (err) {
                    return options.onItemError(err, name, action, options)
                }
            }))
        } catch (err) {
            return options.onError(err, name, options)
        }
    }

    if (options.async === 'serie') {
        try {
            const results = []
            for (const action of actions) {
                try {
                    results.push(await action.fn(options.args))
                } catch (err) {
                    results.push(options.onItemError(err, name, action, options))
                }
            }
            return results
        } catch (err) {
            return options.onError(err, name, options)
        }
    }

    // synchronous execution with arguments
    try {
        return actions.map((action) => {
            try {
                return action.fn(options.args)
            } catch (err) {
                return options.onItemError(err, name, action, options)
            }
        })
    } catch (err) {
        options.onError(err, name, options)
    }
}

