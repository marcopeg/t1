import { getModel } from 'ssr/services/postgres'
import jwtService from 'ssr/services/jwt'
import { createHook } from '@marcopeg/hooks'

const COOKIE_NAME = 'auth::login'

export const login = async (req, res, uname, passw) => {
    const AuthAccount = getModel('AuthAccount')

    const account = await AuthAccount.findLogin(uname, passw)
    if (!account) throw new Error('user not found or wrong password')

    const payload = { id: account.id, etag: account.etag }
    const token = await jwtService.sign(payload)

    res.setAppCookie(COOKIE_NAME, token)

    await AuthAccount.bumpLastLogin(account.id)

    const info = {
        id: account.id,
        lastLogin: account.lastLogin
            ? account.lastLogin.toISOString()
            : null,
        token,
    }

    await createHook(`▶ auth/afterLogin`, {
        async: 'serie',
        ctx: req.hookCtx,
        args: { ...info, req, res },
    })

    return info
}

export const logout = async (req, res) => {
    await createHook(`▶ auth/beforeLogout`, {
        async: 'serie',
        ctx: req.hookCtx,
        args: { req, res },
    })

    res.deleteAppCookie(COOKIE_NAME)
    return true
}
