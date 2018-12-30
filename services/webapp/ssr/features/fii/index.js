/* eslint-disable */

import { GraphQLString } from 'graphql'
import { traceHook, createHook } from '@marcopeg/hooks'

export const register = ({ registerAction }) => {
    registerAction('◇ init::features', {
        action: 'fii',
        handler: () => {
            console.log('[fii] init')
            return 'fii value'
        },
    })

    registerAction('→ express/routes', {
        action: '▶ fii',
        handler: ({ app }) => {
            app.use('/fii', (req, res) => {
                
                const data = {
                    text: 'fiii',
                }

                createHook('▶ fii', {
                    args: { data },
                    ctx: req.hookCtx,
                })

                res.send({
                    ...data,
                    trace:  traceHook(req.hookCtx)('compact')('json'),
                })
            })
        
        },
    })

    registerAction('→ express/graphql', {
        action: '▶ fii',
        handler: ({ queries }) => {
            queries.fii = {
                description: 'Provides fii functions',
                type: GraphQLString,
                resolve: () => 'fiiiiiiii',
            }
        },
    })
    
    registerAction('→ express/graphql-test', {
        action: '▶ fii',
        handler: ({ queries }) => {
            queries.fii = {
                description: 'Provides fii functions',
                type: GraphQLString,
                resolve: () => 'fiiiiiiii-test',
            }
        },
    })

}
