import { appendAction } from './state'
import { logAction } from './logger'

export const registerHook = (name, payload = {}) => {
    const { action, trace, handler, ...meta } = payload
    if (!name) {
        throw new Error('[hook] handlers must have a "name" property!')
    }
    if (!handler || typeof handler !== 'function') {
        throw new Error('[hook] handlers must have a "handler" property as fuction!')
    }

    const actionName = false
        || action
        || (handler.name !== 'handler' ? handler.name : 'unknown')

    const actionPayload = {
        enabled: true,
        hook: name,
        name: actionName,
        trace: trace || 'unknown',
        meta,
        handler,
    }

    logAction('register', actionPayload)
    appendAction(name, actionPayload)
}
