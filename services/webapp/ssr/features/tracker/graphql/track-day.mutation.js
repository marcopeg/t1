import {
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql'

import { GraphQLDate } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'

import { trackDaily } from '../lib/track-daily'

export default {
    description: 'Track a daily log for a specific date',
    args: {
        date: {
            type: new GraphQLNonNull(GraphQLDate),
        },
        records: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLInputObjectType({
                name: 'TrackDailyRecord',
                fields: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    value: {
                        type: new GraphQLNonNull(GraphQLJSON),
                    },
                    meta: {
                        type: GraphQLJSON,
                    },
                },
            }))),
        },
    },
    type: GraphQLBoolean,
    resolve: (params, args, { req }) =>
        trackDaily(req.session.id, args.date, args.records),
}
