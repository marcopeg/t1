import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'
import { EXPRESS_ROUTE, EXPRESS_SSR } from './hooks'

export const register = ({ registerAction, createHook }) =>
    registerAction(EXPRESS_ROUTE, {
        action: EXPRESS_SSR,
        trace: __filename,
        handler: async ({ app, settings }) => {
            const options = {
                ...(settings.reactSSR || {}),
                port: settings.port,
            }

            await createHook(EXPRESS_SSR, {
                async: 'serie',
                args: { options },
            })

            app.use(createSSRRouter(options))
        },
        priority: -999,
        route: '/',
    })
