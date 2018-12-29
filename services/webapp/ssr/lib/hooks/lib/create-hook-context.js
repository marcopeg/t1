/**
 * ExpressJS Middleware
 *
 * creates a unique context name that can be used to trace request
 * related hooks.
 *
 * the entire trace gets removed after a while to keep memory under control.
 */

import { deleteTrace } from './state'

let ctxCount = 0
export const createHookContext = (settings = {}) => (req, res, next) => {
    req.hookCtx = ctxCount++

    setTimeout(() => {
        deleteTrace(req.hookCtx)
    }, settings.duration || 5000)

    next()
}
