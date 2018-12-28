const settings = {}

export const init = ({ isEnabled, token }) => {
    settings.isEnabled = isEnabled
    settings.token = token
}

export const validateToken = (token) => {
    if (!settings.isEnabled) {
        throw new Error('n/a')
    }

    if (settings.token !== token) {
        throw new Error('invalid token')
    }

    return true
}

export const register = ({ registerHook }) => {
    const meta = { name: 'service/test' }
    const initHandler = ({ test }) => init(test)
    registerHook('initServices', initHandler, meta)
}
