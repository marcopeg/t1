import { getSession } from './session'

export const shouldRender = async (req, res) => {
    const session = await getSession(req, res)
    return session === null
}

export const getCacheKey = async (req, res) => {
    const session = await getSession(req, res)
    return session
        ? {
            session,
            value: `${session.id}@${req.url}`,
        }
        : req.url
}
