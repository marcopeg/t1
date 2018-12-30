import { init } from '@marcopeg/utils/lib/logger'

export {
    logError,
    logInfo,
    logVerbose,
    logDebug,
} from '@marcopeg/utils/lib/logger'

export const register = ({ registerAction }) =>
    registerAction('◇ start', {
        action: '→ logger',
        trace: __filename,
        handler: init,
    })
