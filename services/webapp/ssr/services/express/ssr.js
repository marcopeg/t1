import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'

export const register = ({ registerHook }) =>
    registerHook('→ express/routes', {
        action: '→ express/ssr',
        trace: __filename,
        handler: async ({ app, settings }) =>
            app.use(createSSRRouter({ port: settings.port })),
        priority: -999,
        route: '/',
    })
