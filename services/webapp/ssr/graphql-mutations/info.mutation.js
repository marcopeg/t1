import { GraphQLString } from 'graphql'
import ssr from '../../package.json'

export default {
    description: 'Provides info regarding the project',
    type: GraphQLString,
    resolve: () => `${ssr.name} v${ssr.version}`,
}
