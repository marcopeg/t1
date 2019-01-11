import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import { createHook, createHookContext } from '@marcopeg/hooks'
import { INIT_SERVICE, START_SERVICE } from '@marcopeg/hooks'
import { logInfo } from 'ssr/services/logger'
import { EXPRESS_MIDDLEWARE, EXPRESS_ROUTE, EXPRESS_HANDLER } from './hooks'

const app = express()

export const init = async (settings) => {
    logInfo('[express] init...')

    // hook - enable a tracing context that is scoped
    // into the current request
    app.use(createHookContext(settings.hooks || {}))

    // Basics
    app.use(compression())
    app.use(helmet())

    app.use((req, res, next) => {
        req.data = {}
        next()
    })

    await createHook(EXPRESS_MIDDLEWARE, {
        async: 'serie',
        args: { app, settings: { ...settings } },
    })

    await createHook(EXPRESS_ROUTE, {
        async: 'serie',
        args: { app, settings: { ...settings } },
    })

    await createHook(EXPRESS_HANDLER, {
        async: 'serie',
        args: { app, settings: { ...settings } },
    })
}

export const start = (settings) => new Promise((resolve) => {
    logInfo('[express] start server...')
    app.listen(settings.port, () => {
        logInfo(`[express] server is running on ${settings.port}`)
        resolve()
    })
})

export const register = ({ registerAction }) => {
    registerAction({
        hook: INIT_SERVICE,
        name: '→ express',
        trace: __filename,
        handler: ({ express }) => init(express),
    })

    registerAction({
        hook: START_SERVICE,
        name: '→ express',
        trace: __filename,
        handler: ({ express }) => start(express),
    })
}

