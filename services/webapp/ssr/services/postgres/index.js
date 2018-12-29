import { default as init } from './init'
import { default as start } from './start'

export { default as init } from './init'
export { default as start } from './start'
export { default as query } from './query'
export { getModel, registerModel, resetModels } from './conn'

export const register = ({ registerHook }) => {
    registerHook('◇ init::services', {
        action: '→ postgres',
        trace: __filename,
        handler: ({ postgres }) => init(postgres),
    })

    registerHook('◇ start::services', {
        action: '→ postgres',
        trace: __filename,
        handler: ({ postgres }) => start(postgres),
    })
}
