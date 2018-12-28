import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { logInfo } from 'ssr/services/logger'
import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'
import { cookieHelper } from './cookie-helper'
import { deviceId } from './device-id'
import { createGraphQLHandler } from './graphql-handler'

const app = express()
app.settings = {}

export const init = async (settings, createHook) => {
    logInfo('[server] init...')
    const { loginDuration, graphql, port } = settings

    app.settings.port = port

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

    await createHook('server/routes', {
        args: { app },
    })

    // Routes
    app.use('/api', await createGraphQLHandler(graphql))
    app.use(createSSRRouter({ port }))
}

export const start = () => {
    logInfo('[server] start server...')
    const logStart = () => logInfo(`[server] express is running on ${app.settings.port}`)
    app.listen(app.settings.port, logStart)
}

export const register = ({ registerHook, createHook }) => {
    registerHook('initServices', {
        action: 'service.server.init',
        handler: ({ server }) => init(server, createHook),
    })

    registerHook('startServices', {
        action: 'service.server.start',
        handler: ({ server }) => start(server),
    })
}
