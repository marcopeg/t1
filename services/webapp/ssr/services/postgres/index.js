import { default as init } from './init'
import { default as start } from './start'

export { default as init } from './init'
export { default as start } from './start'
export { default as query } from './query'
export { getModel, registerModel, resetModels } from './conn'

export const register = ({ registerHook }) => {
    const meta = { name: 'service/postgres' }

    const initHandler = ({ postgres }) => init(postgres)
    const startHandler = ({ postgres }) => start(postgres)

    registerHook('initServices', initHandler, meta)
    registerHook('startServices', startHandler, meta)
}
