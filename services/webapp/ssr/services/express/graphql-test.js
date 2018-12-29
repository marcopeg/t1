import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql'

import { createHook } from 'ssr/lib/hooks'

const settings = {}

export const init = ({ isEnabled, token }) => {
    settings.isEnabled = isEnabled
    settings.token = token
}

export const validateToken = (token) => {
    if (!settings.isEnabled) {
        throw new Error('n/a')
    }

    if (settings.token !== token) {
        throw new Error('invalid token')
    }

    return true
}

export const initGraphql = async ({ queries, mutations }) => {
    if (!settings.isEnabled) {
        return
    }

    const testQueries = {}
    const testMutations = {}

    const queryPrototype = {
        description: 'Enable test apis protected by a token',
        args: {
            token: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: (params, args) => validateToken(args.token),
    }

    const defaultQueries = {
        enabled: {
            type: GraphQLBoolean,
            resolve: () => true,
        },
    }

    await createHook('→ express/graphql-test', {
        async: 'serie',
        args: {
            queries: testQueries,
            mutations: testMutations,
        },
    })

    queries.test = {
        ...queryPrototype,
        type: new GraphQLObjectType({
            name: 'TestQuery',
            fields: {
                ...testQueries,
                ...defaultQueries,
            },
        }),
    }

    mutations.test = {
        ...queryPrototype,
        type: new GraphQLObjectType({
            name: 'TestMutation',
            fields: {
                ...testMutations,
                ...defaultQueries,
            },
        }),
    }
}

export const register = ({ registerHook }) => {
    registerHook('◇ init::services', {
        action: '→ express/graphql-test',
        trace: __filename,
        handler: ({ graphqlTest }) => init(graphqlTest),
    })

    registerHook('→ express/graphql', {
        action: '→ express/graphql-test',
        trace: __filename,
        handler: initGraphql,
    })
}
