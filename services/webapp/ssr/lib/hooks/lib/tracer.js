import {
    appendTrace,
    getCurrentStack,
    getTraceContext,
    getState,
} from './state'

export const traceAction = (action, options) => {
    const { ctx } = options

    appendTrace(ctx, {
        hook: action.hook,
        name: action.name,
        trace: action.trace,
        meta: action.meta,
        stack: getCurrentStack(),
    })
}

export const traceHook = (ctx = 'boot') =>
    (density = 'normal') => {
        const trace = getTraceContext(ctx)
        const records = trace.map((record) => {
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
                    const depth = '----'.repeat(record.stack.length - 1)
                    return `${depth}${depth.length ? '> ' : ''}${record.name}@${record.hook}`
                default:
                    throw new Error(`[hook] unknown trace density "${density}"`)
            }
        })

        // console.log('')
        // console.log(Object.keys(trace).length)
        // console.log('')

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

traceHook.getHooks = a => getState().hooks[a]
