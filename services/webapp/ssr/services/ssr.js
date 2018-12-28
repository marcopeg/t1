import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'

export const register = ({ registerHook }) =>
    registerHook('service/server/handlers', {
        action: 'ssr',
        meta: { route: '/' },
        handler: async({ app }) =>
            app.use(createSSRRouter({ port: app.settings.port })),
    })
