import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import expressGraphql from 'express-graphql'
import { createHook } from 'ssr/lib/hooks'
import ssr from '../../package.json'

const info = {
    description: 'Provides info regarding the project',
    type: GraphQLString,
    resolve: () => `${ssr.name} v${ssr.version}`,
}

export const createGraphQLHandler = async () => {
    const isDev = [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1

    const queries = { info }
    const mutations = { info }
    const context = { data: {} }
    const config = {
        graphiql: isDev,
    }

    await createHook('service/graphql', {
        async: 'parallel',
        args: {
            queries,
            mutations,
            context,
            config,
        },
    })

    const schema = {
        query: new GraphQLObjectType({
            name: 'RootQuery',
            fields: queries,
        }),
        mutation: new GraphQLObjectType({
            name: 'RootMutation',
            fields: mutations,
        }),
    }

    return (req, res) => expressGraphql({
        schema: new GraphQLSchema(schema),
        graphiql: config.graphiql,
        context: {
            ...context,
            req,
            res,
        },
    })(req, res)
}

export const register = ({ registerHook }) => {
    let mountPoint = null

    registerHook('initServices', {
        action: 'graphql',
        trace: __filename,
        handler: ({ graphql }) => {
            mountPoint = graphql.mountPoint
        },
    })

    registerHook('service/server/routes', {
        action: 'graphql',
        trace: __filename,
        handler: async ({ app }) => {
            if (mountPoint === null) {
                throw new Error('[graphql] mount point not defined')
            }
            app.use(mountPoint, await createGraphQLHandler())
        },
    })
}
