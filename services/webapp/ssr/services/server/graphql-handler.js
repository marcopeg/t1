import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import expressGraphql from 'express-graphql'

const isDev = [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1

export const createGraphQLHandler = ({ queries, mutations }) => {
    const schema = {}

    if (queries) {
        schema.query = new GraphQLObjectType({
            name: 'RootQuery',
            fields: queries,
        })
    }

    if (mutations) {
        schema.mutation = new GraphQLObjectType({
            name: 'RootMutation',
            fields: mutations,
        })
    }

    return (req, res) => expressGraphql({
        schema: new GraphQLSchema(schema),
        graphiql: isDev,
        context: { req, res, data: {} },
    })(req, res)
}
