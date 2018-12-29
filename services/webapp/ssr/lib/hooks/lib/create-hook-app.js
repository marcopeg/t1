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

        await createHook('boot', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('settings', {
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

        await createHook('initService', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('initServices', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('initFeature', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('initFeatures', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('startService', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('startServices', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('startFeature', {
            async: 'serie',
            args: { ...settings },
        })

        await createHook('startFeatures', {
            async: 'parallel',
            args: { ...settings },
        })

        await createHook('up', {
            async: 'serie',
            args: { ...settings },
        })
    }
