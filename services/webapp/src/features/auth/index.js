
export const reducers = {
    auth: require('./reducers/auth.reducer').default,
    settings: require('./reducers/settings.reducer').default,
}
export const services = [
    require('./auth.service'),
]
export const listeners = [
    require('./auth.listener').default,
]

export { login, logout } from './auth.service'
export { SET_LOGIN } from './reducers/auth.reducer'
