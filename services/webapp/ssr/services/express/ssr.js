import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'

export const register = ({ registerAction, createHook }) =>
    registerAction('→ express/routes', {
        action: '→ express/ssr',
        trace: __filename,
        handler: async ({ app, settings }) => {
            const options = {
                port: settings.port,
            }

            await createHook('→ express/ssr', {
                async: 'serie',
                args: { options },
            })

            app.use(createSSRRouter(options))
        },
        priority: -999,
        route: '/',
    })
