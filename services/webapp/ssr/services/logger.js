import { START, SERVICE } from '@marcopeg/hooks'
import { init, logError, logInfo, logVerbose, logDebug } from '@marcopeg/utils/lib/logger'
export { logError, logInfo, logVerbose, logDebug } from '@marcopeg/utils/lib/logger'

// Hooks from other services
const EXPRESS_MIDDLEWARE = `${SERVICE} express/middleware`

const expressMiddleware = (req, res, next) => {
    req.logger = {
        logError,
        logInfo,
        logVerbose,
        logDebug,
    }
    next()
}

export const register = ({ registerAction }) => {
    registerAction(START, {
        action: `${SERVICE} logger`,
        trace: __filename,
        handler: init,
    })

    registerAction(EXPRESS_MIDDLEWARE, {
        action: `${SERVICE} logger`,
        trace: __filename,
        handler: ({ app }) => app.use(expressMiddleware),
    })
}
