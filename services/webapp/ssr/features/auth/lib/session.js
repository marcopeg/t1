import { getModel } from 'ssr/services/postgres'
import jwtService from 'ssr/services/jwt'

const COOKIE_NAME = 'auth::login'

export const getSession = async (req, res) => {
    try {
        // handle multiple calls
        if (req.data.session) {
            return req.data.session
        }

        const token = req.getAppCookie(COOKIE_NAME)
        const data = await jwtService.verify(token)

        req.data.session = {
            id: data.payload.id,
            created: new Date(data.iat * 1000),
            expiry: new Date(data.exp * 1000),
        }

        return req.data.session
    } catch (err) {
        return null
    }
}

export const validateSession = async (req, res) => {
    try {
        const token = req.getAppCookie(COOKIE_NAME)
        const data = await jwtService.verify(token)

        const { id, etag } = data.payload
        await getModel('AuthAccount').validateSession(id, etag)

        const newToken = await jwtService.sign(data.payload)
        const newData = await jwtService.verify(newToken)
        res.setAppCookie(COOKIE_NAME, newToken)

        req.data.session = {
            id: newData.payload.id,
            created: new Date(newData.iat * 1000),
            expiry: new Date(newData.exp * 1000),
        }

        return req.data.session
    } catch (err) {
        return null
    }
}
