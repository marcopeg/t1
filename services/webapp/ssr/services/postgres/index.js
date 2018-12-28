import { default as init } from './init'
import { default as start } from './start'

export { default as init } from './init'
export { default as start } from './start'
export { default as query } from './query'
export { getModel, registerModel, resetModels } from './conn'

export const register = ({ registerHook }) => {
    registerHook('initServices', {
        action: 'postgres',
        handler: ({ postgres }) => init(postgres),
    })

    registerHook('startServices', {
        action: 'postgres',
        handler: ({ postgres }) => start(postgres),
    })
}
