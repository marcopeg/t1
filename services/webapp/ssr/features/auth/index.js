import * as account from './account.model'
import sessionQuery from './graphql/session.query'
import sessionMutation from './graphql/session.mutation'
import authMutation from './graphql/auth.mutation'
import loginMutation from './graphql/login.mutation'
import { shouldRender, getCacheKey } from './lib/ssr'

export const register = ({ registerAction }) => {
    registerAction('→ postgres/beforeStart/default', {
        action: '▶ auth',
        handler: ({ options }) => {
            options.models.push(account)
        },
    })

    registerAction('→ express/graphql', {
        action: '▶ auth',
        handler: async ({ queries, mutations }) => {
            queries.session = await sessionQuery()
            mutations.session = await sessionMutation()
            mutations.auth = authMutation
            mutations.login = loginMutation
        },
    })

    registerAction('→ express/ssr', {
        action: '▶ auth',
        handler: ({ options }) => {
            options.shouldRender = shouldRender
            options.getCacheKey = getCacheKey
        },
    })
}
