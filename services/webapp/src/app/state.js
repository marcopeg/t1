import createSSRState from '@marcopeg/react-ssr/lib/create-ssr-state'

const features = [
    require('features/storage'),
    require('features/network'),
    require('features/locale'),
    require('features/auth'),
    require('features/records'),
    require('features/pages'),
    require('features/mobile'),
]

const app = (state = {
    scope: 'tracker',
    name: 'TrackerApp',
}) => state

export const createState = createSSRState({ app }, features)
