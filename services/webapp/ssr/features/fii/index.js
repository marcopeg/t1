/* eslint-disable */

import { GraphQLString } from 'graphql'
import { traceHook, createHook } from '@marcopeg/hooks'

export const register = ({ registerAction }) => {
    registerAction({
        hook: '◇ init::features',
        name: 'fii',
        handler: () => {
            console.log('[fii] init')
            return 'fii value'
        },
    })

    registerAction({
        hook: '→ express/routes',
        name: '▶ fii',
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

    registerAction({
        hook: '→ express/graphql',
        name: '▶ fii',
        handler: ({ queries }) => {
            queries.fii = {
                description: 'Provides fii functions',
                type: GraphQLString,
                resolve: () => 'fiiiiiiii',
            }
        },
    })
    
    registerAction({
        hook: '→ express/graphql-test',
        name: '▶ fii',
        handler: ({ queries }) => {
            queries.fii = {
                description: 'Provides fii functions',
                type: GraphQLString,
                resolve: () => 'fiiiiiiii-test',
            }
        },
    })

}
