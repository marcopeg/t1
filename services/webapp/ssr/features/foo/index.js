/* eslint-disable */

import { GraphQLString } from 'graphql'

export const register = ({ registerAction, createHook }) => {
    registerAction('▶ fii', {
        action: '▶ foo',
        handler: ({ data }) => {
            data.text += ' handled by foo'
        },
    })

    registerAction('▶ auth/session/query', {
        action: '▶ foo.feature',
        handler: ({ fields }) => {
            fields.foo = {
                type: GraphQLString,
                resolve: (params, args, { req }) => `foo session - ${req.data.session.id}`,
            }
        },
    })

    registerAction('▶ auth/afterLogin', {
        action: '▶ foo.feature',
        handler: ({ id, lastLogin, token }) => {
            console.log('>> FOO ::', id, lastLogin, token)
        },
    })
}
