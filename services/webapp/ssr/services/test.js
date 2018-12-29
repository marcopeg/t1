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

export const register = ({ registerHook }) =>
    registerHook('◇ init::services', {
        action: '→ test',
        trace: __filename,
        handler: ({ test }) => init(test),
    })
