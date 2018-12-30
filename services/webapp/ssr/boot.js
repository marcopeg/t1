import * as config from '@marcopeg/utils/lib/config'
import { registerAction, traceHook, createHookApp } from '@marcopeg/hooks'

require('es6-promise').polyfill()
require('isomorphic-fetch')

const services = [
    require('./services/env'),
    require('./services/logger'),
    require('./services/hash'),
    require('./services/jwt'),
    require('./services/postgres'),
    require('./services/express/cookie-helper'),
    require('./services/express/device-id'),
    require('./services/express/graphql'),
    require('./services/express/graphql-test'),
    require('./services/express/ssr'),
    require('./services/express'),
]

const features = [
    require('./features/foo'),
    require('./features/fii'),
    require('./features/auth'),
]

registerAction('◇ settings', {
    action: '♦ boot',
    handler: ({ settings }) => {
        settings.hash = {
            rounds: Number(config.get('BCRYPT_ROUNDS')),
        }

        settings.jwt = {
            secret: String(config.get('JWT_SECRET')),
            duration: String(config.get('JWT_DURATION')),
        }

        // list one or more connections
        settings.postgres = [{
            connectionName: 'default',
            host: config.get('PG_HOST'),
            port: config.get('PG_PORT'),
            database: config.get('PG_DATABASE'),
            username: config.get('PG_USERNAME'),
            password: config.get('PG_PASSWORD'),
            maxAttempts: Number(config.get('PG_MAX_CONN_ATTEMPTS')),
            attemptDelay: Number(config.get('PG_CONN_ATTEMPTS_DELAY')),
            models: [],
        }]

        settings.express = {
            nodeEnv: config.get('NODE_ENV'),
            port: config.get('SERVER_PORT'),
            cookieHelper: {
                scope: 't1',
                duration: String(config.get('LOGIN_DURATION')),
            },
            deviceId: {
                scope: 'xDeviceId',
                header: 'x-device-id',
            },
            graphql: {
                mountPoint: config.get('GRAPHQL_MOUNT_POINT'),
            },
        }

        settings.graphqlTest = {
            isEnabled: [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1,
            token: config.get('GRAPHQL_TEST_TOKEN'),
        }
    },
})

registerAction('◇ finish', {
    action: '♦ boot',
    handler: () => {
        console.log('')
        console.log('')
        console.log('Boot Trace:')
        console.log('=================')
        console.log(traceHook()('compact')('cli').join('\n'))
        console.log('')
        console.log('')
        // console.log(traceHook()('full')('json'))
        // console.log(traceHook.getHooks('service/server/routes'))
    },
})

export default createHookApp({
    settings: { cwd: process.cwd() },
    services,
    features,
})
