import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { createHook, createHookContext } from 'ssr/lib/hooks'
import { logInfo } from 'ssr/services/logger'
import { cookieHelper } from './cookie-helper'
import { deviceId } from './device-id'

const app = express()
app.settings = {}

export const init = async (settings) => {
    logInfo('[server] init...')
    const { loginDuration, port } = settings

    app.settings.port = port

    // hook - enable a tracing context that is scoped
    // into the current request
    app.use(createHookContext())

    // Basics
    app.use(compression())
    app.use(helmet())

    // COOKIES
    // allow routes and controllers to set a cookie
    app.use(cookieParser())
    app.use(cookieHelper({
        scope: 't1',
        duration: loginDuration,
    }))

    // DEVICE ID
    app.use(deviceId({
        scope: 'xDeviceId',
        header: 'x-device-id',
    }))

    await createHook('service/server/middlewares', {
        async: 'serie',
        args: { app },
    })

    await createHook('service/server/routes', {
        async: 'serie',
        args: { app },
    })

    await createHook('service/server/handlers', {
        async: 'serie',
        args: { app },
    })
}

export const start = () => {
    logInfo('[server] start server...')
    const logStart = () => logInfo(`[server] express is running on ${app.settings.port}`)
    app.listen(app.settings.port, logStart)
}

export const register = ({ registerHook }) => {
    registerHook('initServices', {
        action: 'server',
        trace: __filename,
        handler: ({ server }) => init(server),
    })

    registerHook('startServices', {
        action: 'server',
        trace: __filename,
        handler: ({ server }) => start(server),
    })
}
