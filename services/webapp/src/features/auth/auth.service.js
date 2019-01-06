import { runQuery } from 'features/network'
import { localStorage } from 'features/storage'
import loginMutation from './queries/login.mutation'
import logoutMutation from './queries/logout.mutation'
import { setLogin } from './reducers/auth.reducer'

// removes all the current session informations
const clearSession = () => (dispatch) => {
    dispatch({ type: '@reset' })
    dispatch(localStorage.removeItem('auth::session'))
}

const persistSession = session => (dispatch) => {
    dispatch(clearSession())
    dispatch(setLogin(session))
    dispatch(localStorage.setItem('auth::session', session))
}

export const login = (uname, passw) => async (dispatch) => {
    try {
        const res = await dispatch(runQuery(loginMutation, { uname, passw }))
        const session = res.data.login

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
        dispatch(clearSession())

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
    const session = dispatch(localStorage.getItem('auth::session'))
    if (session) {
        dispatch(setLogin(session))
    }
}
