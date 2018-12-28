import * as config from '@marcopeg/utils/lib/config'
import { registerHook } from 'ssr/lib/hook';
import { boot } from 'ssr/lib/boot'

import services from './services'
import features from './features'

import grahqlQueries from './graphql-queries'
import grahqlMutations from './graphql-mutations'

require('es6-promise').polyfill()
require('isomorphic-fetch')

registerHook('settings', ({ settings }) => {
    settings.hash = {
        rounds: Number(config.get('BCRYPT_ROUNDS')),
    }

    settings.jwt = {
        secret: String(config.get('JWT_SECRET')),
        duration: String(config.get('JWT_DURATION')),
    }

    settings.postgres = {
        host: config.get('PG_HOST'),
        port: config.get('PG_PORT'),
        database: config.get('PG_DATABASE'),
        username: config.get('PG_USERNAME'),
        password: config.get('PG_PASSWORD'),
        maxAttempts: Number(config.get('PG_MAX_CONN_ATTEMPTS')),
        attemptDelay: Number(config.get('PG_CONN_ATTEMPTS_DELAY')),
        models: [],
    }

    settings.server = {
        nodeEnv: config.get('NODE_ENV'),
        port: config.get('SERVER_PORT'),
        loginDuration: String(config.get('LOGIN_DURATION')),
        graphql: {
            queries: grahqlQueries,
            mutations: grahqlMutations,
        },
    }

    settings.test = {
        isEnabled: [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1,
        token: config.get('GRAPHQL_TEST_TOKEN'),
    }
})

export default boot({
    settings: { cwd: process.cwd() },
    services,
    features,
})
