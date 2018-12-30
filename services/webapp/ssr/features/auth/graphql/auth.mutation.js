import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from 'graphql'

import { validateSession } from '../lib/session'

export default {
    description: 'Validates a session and extends the expiration',
    type: new GraphQLObjectType({
        name: 'AuthVerifiedSession',
        fields: {
            id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            created: {
                type: new GraphQLNonNull(GraphQLString),
            },
            expiry: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
    }),
    resolve: (params, args, { req, res }) =>
        validateSession(req, res),
}
