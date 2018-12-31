import {
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql'

import trackerDaily from './tracker-daily.query'

export default {
    description: 'Provides informations about tracked data',
    type: new GraphQLNonNull(new GraphQLObjectType({
        name: 'Tracker',
        fields: {
            daily: trackerDaily,
        },
    })),
    resolve: () => ({}),
}
