import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
} from 'graphql'

import { GraphQLDateTime } from 'graphql-iso-date'

import { createHook } from '@marcopeg/hooks'
import { getSession } from '../lib/session'

export default async () => {
    const fields = {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        created: {
            type: new GraphQLNonNull(GraphQLDateTime),
        },
        expiry: {
            type: new GraphQLNonNull(GraphQLDateTime),
        },
    }

    await createHook('▶ auth/session/query', {
        async: 'serie',
        args: { fields },
    })

    return {
        description: 'Wraps session dependent queries',
        type: new GraphQLObjectType({
            name: 'AuthSession',
            fields,
        }),
        resolve: (params, args, { req, res }) =>
            getSession(req, res),
    }
}
