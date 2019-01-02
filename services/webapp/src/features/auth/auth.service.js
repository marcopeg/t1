import { runQuery } from 'lib/http'
import localStorage from 'lib/local-storage'
import loginMutation from './queries/login.mutation'
import logoutMutation from './queries/logout.mutation'
import { setLogin } from './reducers/auth.reducer'

// removes all the current session informations
const cleanSession = () => (dispatch) => {
    dispatch({ type: '@reset' })
    localStorage.removeItem('auth::session')
}

const persistSession = session => (dispatch) => {
    dispatch(cleanSession())
    dispatch(setLogin(session))
    localStorage.setItem('auth::session', session)
}

export const login = (uname, passw) => async (dispatch) => {
    try {
        const res = await dispatch(runQuery(loginMutation, { uname, passw }))
        const session = res.login

        dispatch(persistSession(session))

        return {
            success: 'true',
            session,
        }
    } catch (err) {
        return {
            success: false,
            errorMsg: err.message,
        }
    }
}

export const logout = () => async (dispatch) => {
    try {
        await dispatch(runQuery(logoutMutation))
        dispatch(cleanSession())

        return {
            success: 'true',
        }
    } catch (err) {
        return {
            success: false,
            errorMsg: err.message,
        }
    }
}

// restore session from localStorage
export const start = () => (dispatch, getState) => {
    const { ssr } = getState()

    if (ssr.isServer()) {
        return
    }

    const session = localStorage.getItem('auth::session')
    if (session) {
        dispatch(setLogin(session))
    }
}
