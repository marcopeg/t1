import { default as init } from './init'
import { default as start } from './start'

export { default as init } from './init'
export { default as start } from './start'
export { default as query } from './query'
export { getModel, registerModel, resetModels } from './conn'

export const register = ({ registerAction, createHook }) => {
    registerAction('◇ init::service', {
        action: '→ postgres',
        trace: __filename,
        handler: async ({ postgres }) => {
            for (const options of postgres) {
                const name = `→ postgres/beforeInit/${options.connectionName || 'default'}`
                createHook(name, { args: { options } })
                await init(options)
            }
        },
    })

    registerAction('◇ start::service', {
        action: '→ postgres',
        trace: __filename,
        handler: async ({ postgres }) => {
            for (const options of postgres) {
                const name = `→ postgres/beforeStart/${options.connectionName || 'default'}`
                createHook(name, { args: { options } })
                await start(options)
            }
        },
    })
}
