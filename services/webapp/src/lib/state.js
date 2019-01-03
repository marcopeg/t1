import createSSRState from '@marcopeg/react-ssr/lib/create-ssr-state'
import features from '../features'

const app = (state = {
    scope: 'tracker',
    name: 'TrackerApp',
}) => state

export const createState = createSSRState({ app }, features)
