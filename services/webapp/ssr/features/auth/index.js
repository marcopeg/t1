import { FEATURE } from '@marcopeg/hooks'
import * as account from './account.model'
import sessionQuery from './graphql/session.query'
import sessionMutation from './graphql/session.mutation'
import authMutation from './graphql/auth.mutation'
import loginMutation from './graphql/login.mutation'
import { shouldRender, getCacheKey } from './lib/ssr'

// list of hooks that I plan to use here
import { EXPRESS_MIDDLEWARE, EXPRESS_SSR, EXPRESS_GRAPHQL } from 'ssr/services/express/hooks'
import { POSTGRES_BEFORE_START } from 'ssr/services/postgres/hooks'
import { getSessionMiddleware } from './lib/session'

const FEATURE_NAME = `${FEATURE} auth`

export const register = ({ registerAction }) => {
    registerAction(`${POSTGRES_BEFORE_START}/default`, {
        action: FEATURE_NAME,
        handler: ({ options }) => {
            options.models.push(account)
        },
    })

    registerAction(EXPRESS_GRAPHQL, {
        action: FEATURE_NAME,
        handler: async ({ queries, mutations }) => {
            queries.session = await sessionQuery()
            mutations.session = await sessionMutation()
            mutations.auth = authMutation
            mutations.login = loginMutation
        },
    })

    registerAction(EXPRESS_MIDDLEWARE, {
        action: FEATURE_NAME,
        handler: ({ app }) => app.use(getSessionMiddleware()),
    })

    registerAction(EXPRESS_SSR, {
        action: FEATURE_NAME,
        handler: ({ options }) => {
            options.shouldRender = shouldRender
            options.getCacheKey = getCacheKey
        },
    })
}
