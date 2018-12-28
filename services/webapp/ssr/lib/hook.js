
const hooks = {}
const trace = {}

// wrap a single hook error and creates a rich error type
// that contains info regarding it's logical origin
const onItemError = (err, action, options) => {
    const message = err && err.message
        ? err.message
        : (typeof err === 'string' ? err : 'unknown error')

    const error = new Error(`[hook] ${message}`)
    error.hook = action.hook
    error.action = action.name
    error.trace = action.trace
    error.originalError = err
    error.traceStack = trace

    throw error
}

const LOG_LEVEL = String(process.env.LOG_LEVEL).toLowerCase()
const log = (text) => {
    if (['verbose', 'debug'].indexOf(LOG_LEVEL) !== -1) {
        console.log(text)
    }
}

const logAction = (text, action) => {
    const name = `${action.hook}/${action.name}`
    const trace = action.trace && action.trace !== 'unknown' ? `(origin: ${action.trace})` : ''
    log(`[hook] ${text} - "${name}" ${trace}`)
}

const traceAction = (action, options) => {
    const { ctx } = options
    if (!trace[ctx]) {
        trace[ctx] = []
    }
    trace[ctx].push(action)
}

const runAction = async (action, options) => {
    logAction('run', action)
    try {
        traceAction(action, options)
        return await action.handler(options.args)
    } catch (err) {
        return options.onItemError(err, action, options)
    }
}

const runActionSync = (action, options) => {
    logAction('run (sync)', action)
    try {
        traceAction(action, options)
        return action.handler(options.args)
    } catch (err) {
        return options.onItemError(err, action, options)
    }
}

const defaultOptions = {
    async: false,
    args: null,
    ctx: 'boot',
    onError: (err) => { throw err },
    onItemError,
}

export const registerHook = (name, payload = {}) => {
    const {trace, handler, ...meta } = payload
    if (!name) {
        throw new Error('[hook] handlers must have a "name" property!')
    }
    if (!handler || typeof handler !== 'function') {
        throw new Error('[hook] handlers must have a "handler" property as fuction!')
    }

    const actionName = false
        || meta.action
        || (handler.name !== 'handler' ? handler.name : 'unknown')

    const action = {
        enabled: true,
        hook: name,
        name: actionName,
        trace: trace || 'unknown',
        meta,
        handler,
    }

    logAction('register', action)

    if (!hooks[name]) {
        hooks[name] = []
    }
    hooks[name].push(action)
}

export const createHook = async (name, receivedOptions = {}) => {
    if (!hooks[name]) {
        log(`[hook] "${name}" is empty`)
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
            return await Promise.all(actions.map(action => runAction(action, options)))
        } catch (err) {
            return options.onError(err, name, options)
        }
    }

    if (options.async === 'serie') {
        try {
            const results = []
            for (const action of actions) {
                results.push(await runAction(action, options))
            }
            return results
        } catch (err) {
            return options.onError(err, name, options)
        }
    }

    // synchronous execution with arguments
    try {
        return actions.map(action => runActionSync(action, options))
    } catch (err) {
        options.onError(err, name, options)
    }
}

// traceHook(context)(compact)(json)
export const traceHook = (ctx = 'boot') =>
    (density = 'normal') => {
        const records = (trace[ctx] || []).map((record) => {
            switch (density) {
                case 'full':
                    return record
                case 'normal':
                    return {
                        hook: record.hook,
                        name: record.name,
                        trace: record.trace,
                        meta: record.meta,
                    }
                case 'compact':
                    return `${record.hook}/${record.name}`
                default:
                    throw new Error(`[hook] unknown trace density "${density}"`)
            }
        })
    
        return (output = 'json') => {
            switch (output) {
                case 'json':
                    return records
                case 'cli':
                    console.log(records)
                    return
                default:
                    throw new Error(`[hook] unknown trace output "${output}"`)
            }
        }
    }


export const createHookApp = ({ services, features, settings }) =>
    async () => {
        for (const service of services) {
            if (service.register) await service.register({
                registerHook,
                createHook,
                settings: { ...settings },
            })
        }

        await createHook('boot', {
            async: 'serie',
            args: { ...settings },
        })
        
        await createHook('settings', {
            async: 'serie',
            args: { settings },
        })
        
        for (const feature of features) {
            if (feature.register) await feature.register({
                registerHook,
                createHook,
                settings: { ...settings },
            })
        }

        await createHook('initService', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('initServices', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('initFeature', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('initFeatures', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('startService', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('startServices', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('startFeature', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('startFeatures', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('up', {
            async: 'serie',
            args: { ...settings },
        })
    }

