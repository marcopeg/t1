import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'

export const register = ({ registerHook }) =>
    registerHook('service/server/routes', {
        action: 'ssr',
        trace: __filename,
        handler: async ({ app }) => app.use(createSSRRouter({ port: app.settings.port })),
        priority: -999,
        route: '/',
    })
