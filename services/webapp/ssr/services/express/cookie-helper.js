import millisecond from 'millisecond'
import { EXPRESS_MIDDLEWARE } from './hooks'

export const cookieHelper = ({ scope, duration }) =>
    (req, res, next) => {
        const isDev = [ 'development', 'test' ].indexOf(process.env.NODE_ENV) !== -1

        const options = {
            httpOnly: true,
            secure: !isDev,
            maxAge: millisecond(duration),
        }

        // @TODO: prefix from env variable
        const getName = name => `${scope || 'xxx'}::${name}`

        // Set cookie
        res.setAppCookie = (name, content) => {
            res.cookie(getName(name), content, options)
        }

        // Delete cookie
        res.deleteAppCookie = name => res.clearCookie(getName(name))

        // Retrieve cookoe
        req.getAppCookie = name => req.cookies[getName(name)]

        next()
    }

export const register = ({ registerAction }) =>
    registerAction(EXPRESS_MIDDLEWARE, {
        action: '→ express/cookie-helper',
        trace: __filename,
        handler: async ({ app, settings }) =>
            app.use(cookieHelper(settings.cookieHelper)),
    })
