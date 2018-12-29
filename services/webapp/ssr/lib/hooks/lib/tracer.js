import {
    appendTrace,
    getCurrentStack,
    getTraceContext,
    getState,
} from './state'
// import { runInNewContext } from 'vm';

export const traceAction = (action, options) => {
    const { ctx } = options

    appendTrace(ctx, {
        hook: action.hook,
        name: action.name,
        trace: action.trace,
        meta: action.meta,
        priority: action.priority,
        stack: getCurrentStack(),
    })
}

// should use the "stack" info to nest items into each other
export const nestObjects = (list) => {
    // const result = []
    // let parent = null

    // for (const item of list) {
    //     if (item.stack.length === 1) {
    //         parent = item
    //         result.push({
    //             ...item,
    //             children: [],
    //         })
    //     } else {
    //         parent.children.push(item)
    //         // console.log('>>>>>')
    //         // console.log(parent)
    //         // console.log(item)
    //         // console.log('<<<<<')
    //     }

    //     console.log(item)
    // }

    // console.log('')
    // console.log('')
    // console.log('')

    return list
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
                        priority: record.priority,
                        trace: record.trace,
                        meta: record.meta,
                        stack: record.stack,
                    }
                case 'compact':
                    const depth = '  '.repeat(record.stack.length - 1)
                    return {
                        hook: `${depth}${record.name} ${record.hook}`,
                        stack: record.stack,
                    }
                default:
                    throw new Error(`[hook] unknown trace density "${density}"`)
            }
        })

        return (output = 'json') => {
            switch (output) {
                case 'json':
                    return nestObjects(records)
                case 'cli':
                    return records.map(record => record.hook)
                default:
                    throw new Error(`[hook] unknown trace output "${output}"`)
            }
        }
    }

traceHook.getHooks = a => getState().hooks[a]
