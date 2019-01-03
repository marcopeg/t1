import path from 'path'
import fs from 'fs'

import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import GraphQLJSON from 'graphql-type-json'

import { EXPRESS_GRAPHQL } from 'ssr/services/express/hooks'

const loadMessages = (locale) => new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), 'build', 'locale', `${locale}.json`)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(`localization "${locale}" not available`)
            return
        }
        try {
            resolve(JSON.parse(data))
        } catch (err) {
            reject(`localization "${locale}" is corrupted`)
        }
    })
})

const localeQuery = {
    description: 'Provides localized messages',
    args: {
        locale: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    type: new GraphQLNonNull(new GraphQLObjectType({
        name: 'Locale',
        fields: {
            locale: {
                type: new GraphQLNonNull(GraphQLString),
            },
            messages: {
                type: GraphQLJSON,
            },
        },
    })),
    resolve: async (params, args) => ({
        locale: args.locale,
        messages: await loadMessages(args.locale),
    }),
}

export const register = ({ registerAction }) => {
    registerAction(EXPRESS_GRAPHQL, {
        action: '▶ locale',
        handler: ({ queries }) => {
            queries.locale = localeQuery
        },
    })
}
