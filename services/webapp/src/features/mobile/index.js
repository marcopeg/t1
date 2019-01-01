import loadable from 'react-loadable'

export const reducers = {}
export const services = []
export const listeners = []

const Loading = () => 'loading...'

export const AppMobile = loadable({
    loader: () => import(/* webpackChunkName: "AppMobile" */ './AppMobile'),
    loading: Loading,
})

