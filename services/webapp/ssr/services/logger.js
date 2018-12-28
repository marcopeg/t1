import { init } from '@marcopeg/utils/lib/logger'

export {
    logError,
    logInfo,
    logVerbose,
    logDebug,
} from '@marcopeg/utils/lib/logger'

export const register = ({ registerHook }) =>
    registerHook('boot', init, { name: 'service/logger' })
