/* eslint-disable */

import { GraphQLString } from 'graphql'

export const register = ({ registerAction, createHook }) => {
    registerAction({
        hook: '▶ fii',
        name: '▶ foo',
        handler: ({ data }) => {
            data.text += ' handled by foo'
        },
    })

    registerAction({
        hook: '▶ auth/session/query',
        name: '▶ foo.feature',
        handler: ({ fields }) => {
            fields.foo = {
                type: GraphQLString,
                resolve: (params, args, { req }) => `foo session - ${req.data.session.id}`,
            }
        },
    })

    registerAction({
        hook: '▶ auth/afterLogin',
        name: '▶ foo.feature',
        handler: ({ id, lastLogin, token }) => {
            console.log('>> FOO ::', id, lastLogin, token)
        },
    })
}
