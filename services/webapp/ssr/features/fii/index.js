import { GraphQLString } from 'graphql'
import { traceHook } from 'ssr/lib/hook'

export const register = ({ registerHook }) => {
    const meta = { name: 'feature/fii', foo: 123 }

    // registerHook('initFeature', () => {
    //     console.log('init FII')
    // }, meta)

    // registerHook('startFeature', () => new Promise((resolve, reject) => {
    //     console.log('startFeature FII...')
    //     setTimeout(() => {
    //         console.log('resolve FII startFeature')
    //         resolve('foooo')
    //     }, 1000)
    // }), meta)


    registerHook('server/routes', ({ app }) => {
        app.use('/fii', (req, res) => {
            res.send({
                text: 'fiiii',
                trace:  traceHook(true),
            })
        })
    
    }, meta)

    registerHook('server/graphql', ({ queries }) => {
        console.log('************')
        console.log(queries)
        queries.fii = {
            description: 'Provides fii functions',
            type: GraphQLString,
            resolve: () => 'fiiiiiiii',
        }
    }, meta)

}
