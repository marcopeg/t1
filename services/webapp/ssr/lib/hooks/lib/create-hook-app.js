import { createHook } from './create-hook'
import { registerHook } from './register-hook'

export const createHookApp = ({ services, features, settings }) =>
    async () => {
        for (const service of services) {
            if (service.register) {
                await service.register({
                    registerHook,
                    createHook,
                    settings: { ...settings },
                })
            }
        }

        await createHook('◇ boot', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('◇ settings', {
            async: 'serie',
            args: { settings },
        })

        for (const feature of features) {
            if (feature.register) {
                await feature.register({
                    registerHook,
                    createHook,
                    settings: { ...settings },
                })
            }
        }

        await createHook('◇ init::service', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('◇ init::services', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('◇ init::feature', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('◇ init::features', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('◇ start::service', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('◇ start::services', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('◇ start::feature', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('◇ start::features', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('◇ up', {
            async: 'serie',
            args: { ...settings },
        })
    }
