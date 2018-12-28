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

export const init = ({ loginDuration, graphql, port }) => {
    logInfo('[server] init...')
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

    // Routes
    app.use('/api', createGraphQLHandler(graphql))
    app.use(createSSRRouter({ port }))
}

export const start = () => {
    logInfo('[server] start server...')
    const logStart = () => logInfo(`[server] express is running on ${app.settings.port}`)
    app.listen(app.settings.port, logStart)
}

export const register = ({ registerHook }) => {
    const meta = { name: 'service/server' }

    const initHandler = ({ server }) => init(server)
    const startHandler = ({ server }) => start(server)

    registerHook('initServices', initHandler, meta)
    registerHook('startServices', startHandler, meta)
}
