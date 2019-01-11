import path from 'path'
import * as config from '@marcopeg/utils/lib/config'
import {
    registerAction,
    createHookApp,
    logBoot,
    SETTINGS,
    FINISH,
} from '@marcopeg/hooks'

require('es6-promise').polyfill()
require('isomorphic-fetch')

const services = [
    require('./services/env'),
    require('./services/logger'),
    require('./services/hash'),
    require('./services/jwt'),
    require('./services/postgres'),
    require('./services/express/static'),
    require('./services/express/cookie-helper'),
    require('./services/express/locale'),
    require('./services/express/device-id'),
    require('./services/express/graphql'),
    require('./services/express/graphql-test'),
    require('./services/express/ssr'),
    require('./services/express'),
]

const features = [
    // require('./features/foo'),
    // require('./features/fii'),
    require('./features/locale'),
    require('./features/tracker'),
    require('./features/auth'),
]

registerAction({
    hook: SETTINGS,
    name: '♦ boot',
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
            static: [
                {
                    path: '/static',
                    source: path.join(process.cwd(), 'build', 'static'),
                },
                {
                    path: '/manifest.json',
                    source: path.join(process.cwd(), 'build'),
                },
                {
                    path: '/favicon.ico',
                    source: path.join(process.cwd(), 'build'),
                },
            ],
            locale: {
                cookieName: `${String(config.get('APP_ID'))}--locale`,
            },
            cookieHelper: {
                scope: String(config.get('APP_ID')),
                duration: String(config.get('LOGIN_DURATION')),
            },
            deviceId: {
                scope: 'xDeviceId',
                header: 'x-device-id',
            },
            graphql: {
                mountPoint: config.get('GRAPHQL_MOUNT_POINT'),
            },
            reactSSR: {
                initialState: {
                    app: {
                        name: String(config.get('APP_NAME')),
                    },
                    storage: {
                        scope: String(config.get('APP_ID')),
                    },
                },
            },
        }

        settings.graphqlTest = {
            isEnabled: [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1,
            token: config.get('GRAPHQL_TEST_TOKEN'),
        }
    },
})

registerAction({
    hook: FINISH,
    name: '♦ boot',
    handler: () => logBoot(),
})

export default createHookApp({
    settings: { cwd: process.cwd() },
    services,
    features,
})
