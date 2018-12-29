import { traceAction } from './tracer'
import { logAction } from './logger'

export const runAction = async (action, options) => {
    logAction('run', action)
    try {
        traceAction(action, options)
        return await action.handler(options.args)
    } catch (err) {
        return options.onItemError(err, action, options)
    }
}

export const runActionSync = (action, options) => {
    logAction('run (sync)', action)
    try {
        traceAction(action, options)
        return action.handler(options.args)
    } catch (err) {
        return options.onItemError(err, action, options)
    }
}
