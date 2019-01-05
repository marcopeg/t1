import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
} from 'graphql'

import { GraphQLDate } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'

import { getDailyLogs } from '../lib/track-daily'

export default {
    description: 'Provides informations about tracked data',
    args: {
        date: {
            type: GraphQLDate,
        },
        period: {
            type: GraphQLInt,
        },
    },
    type: new GraphQLNonNull(new GraphQLList(new GraphQLObjectType({
        name: 'TrackerDailyItem',
        fields: {
            name: {
                type: new GraphQLNonNull(GraphQLString),
            },
            date: {
                type: new GraphQLNonNull(GraphQLDate),
            },
            value: {
                type: new GraphQLNonNull(GraphQLJSON),
            },
            meta: {
                type: new GraphQLNonNull(GraphQLJSON),
            },
        },
    }))),
    resolve: (params, args, { req }) => getDailyLogs(req.session.id, args.date, args.period),
}
