/* eslint-disable */

import { GraphQLString } from 'graphql'
import { traceHook, createHook } from 'ssr/lib/hooks'

export const register = ({ registerHook }) => {
    registerHook('→ express/routes', {
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

    registerHook('→ express-graphql', {
        action: '▶ fii',
        handler: ({ queries }) => {
            queries.fii = {
                description: 'Provides fii functions',
                type: GraphQLString,
                resolve: () => 'fiiiiiiii',
            }
        },
    })

}
