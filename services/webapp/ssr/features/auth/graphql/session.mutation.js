import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql'

import { createHook } from '@marcopeg/hooks'
import { getSession } from '../lib/session'
import { logout } from '../lib/login'

export default async () => {
    const fields = {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        created: {
            type: new GraphQLNonNull(GraphQLString),
        },
        expiry: {
            type: new GraphQLNonNull(GraphQLString),
        },
        logout: {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: (params, args, { req, res }) =>
                logout(req, res),
        },
    }

    await createHook('▶ auth/session/mutation', {
        async: 'serie',
        args: { fields },
    })

    return {
        description: 'Wraps session dependent mutations',
        type: new GraphQLObjectType({
            name: 'AuthSessionMutation',
            fields,
        }),
        resolve: (params, args, { req, res }) =>
            getSession(req, res),
    }
}
