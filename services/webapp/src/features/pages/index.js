import loadable from 'react-loadable'

export const reducers = {}
export const services = []
export const listeners = []

const Loading = () => null

export const LoginPage = loadable({
    loader: () => import(/* webpackChunkName: "LoginPage" */ './screens/LoginPage'),
    loading: Loading,
})

export const ErrorPage = loadable({
    loader: () => import(/* webpackChunkName: "ErrorPage" */ './screens/ErrorPage'),
    loading: Loading,
})

export const HomePage = loadable({
    loader: () => import(/* webpackChunkName: "HomePage" */ './screens/HomePage'),
    loading: Loading,
})
