import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { createHook, createHookContext } from '@marcopeg/hooks'
import { logInfo } from 'ssr/services/logger'

const app = express()

export const init = async (settings) => {
    logInfo('[express] init...')

    app.use((req, res, next) => {
        req.data = {}
        next()
    })

    // hook - enable a tracing context that is scoped
    // into the current request
    app.use(createHookContext())

    // Basics
    app.use(compression())
    app.use(helmet())

    // COOKIES
    app.use(cookieParser())

    await createHook('→ express/middlewares', {
        async: 'serie',
        args: { app, settings: { ...settings } },
    })

    await createHook('→ express/routes', {
        async: 'serie',
        args: { app, settings: { ...settings } },
    })

    await createHook('→ express/handlers', {
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
    registerAction('◇ init::service', {
        action: '→ express',
        trace: __filename,
        handler: ({ express }) => init(express),
    })

    registerAction('◇ start::service', {
        action: '→ express',
        trace: __filename,
        handler: ({ express }) => start(express),
    })
}
